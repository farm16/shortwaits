import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  BusinessType,
  ServicesType,
  ObjectId,
  BusinessHoursType,
  BusinessPayloadType,
} from "@shortwaits/shared-types";
import { Business } from "./entities/business.entity";
import { CreateBusinessDto } from "./dto/createBusinessDto";
import { UpdateBusinessDto } from "./dto/updateBusinessDto";
import { Service } from "../services/entities/service.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(User.name) private userModel: Model<User>,
    private config: ConfigService
  ) {}

  isUserAdminType(business: Business, userId: string) {
    const isAdmin = business.admins.includes(userId as unknown as ObjectId);
    const isSuperAdmin = business.superAdmins.includes(
      userId as unknown as ObjectId
    );
    if (isAdmin || isSuperAdmin) {
      return { isAdmin, isSuperAdmin };
    } else {
      throw new ForbiddenException("Can't access business record");
    }
  }

  async findBusinessById(businessId: string | ObjectId) {
    const businessData = await this.businessModel.findById(businessId).exec();

    if (businessData) {
      return businessData;
    } else {
      throw new NotFoundException("Business not available");
    }
  }
  /**
   *
   * we need to verify that user is an admin for the requested business
   *
   */
  async getBusiness(businessId: string, userId: string): Promise<Business> {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );

    if (isAdmin || isSuperAdmin) {
      return businessData;
    }
  }
  async updateBusiness(
    userId: string,
    business: Partial<BusinessPayloadType>
  ): Promise<Business> {
    const businessData = await this.findBusinessById(business._id);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );

    if (isAdmin || isSuperAdmin) {
      return businessData;
    }
  }

  async updateBusinessHours(
    businessId: string,
    userId: string,
    dto: { hours: BusinessHoursType }
  ): Promise<Business> {
    const businessData = await this.businessModel.findOne(
      { _id: businessId },
      null,
      { new: true }
    );

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );
    if (isAdmin || isSuperAdmin) {
      businessData.hours = dto.hours;
      console.log({ ...dto });
      return await businessData.save();
    }
  }

  async createBusiness(dto: CreateBusinessDto): Promise<Business> {
    const newBusiness = await (await this.businessModel.create(dto)).save();
    return newBusiness;
  }

  async findByKey(
    businessId: string,
    key: keyof BusinessType
  ): Promise<Business> {
    const data = await this.businessModel
      .findById(businessId, String(key))
      .exec();
    console.log("findByKey>>>", businessId, key, data);
    return data;
  }

  async registerBusiness(dto: {
    userId: string;
    services: Partial<ServicesType>[];
    business: Partial<BusinessType>;
  }): Promise<{ business: Business; user: User }> {
    // console.log('userId >>>', dto.userId);
    // console.log('newServices >>>', dto.services);
    // console.log('business >>>', dto.business);

    const services = dto.services.map((service) => {
      return { ...service, businessId: dto.userId };
    });
    const insertedServices = await this.serviceModel.insertMany(services);

    const servicesIds = insertedServices.map((service) => service._id);

    const business = await this.businessModel.create({
      ...dto.business,
      services: servicesIds,
      isRegistrationCompleted: true,
      admins: [dto.userId],
      superAdmin: [dto.userId],
      createdBy: [dto.userId],
      updatedBy: [dto.userId],
    });

    const user = await this.userModel.findByIdAndUpdate(
      dto.userId,
      {
        $push: {
          businesses: business._id,
        },
        registrationState: {
          screenName: "",
          state: 1,
          isCompleted: true,
        },
      },
      { new: true }
    );

    console.log("registration: new user >>> ", user);

    return { business, user };
  }

  async getStaff(businessId: string, userId: string) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );
    if (isAdmin || isSuperAdmin) {
      console.log("finding staff");
      const staff = this.userModel
        .find({
          _id: {
            $in: businessData.staff,
          },
        })
        .select("-__v -hashedRt");
      return staff;
    }
  }
}
