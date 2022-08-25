import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from "@nestjs/common";
import {
  BusinessType,
  ObjectId,
  BusinessHoursType,
  BusinessPayloadType,
} from "@shortwaits/shared-types";
import { Business } from "./entities/business.entity";
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

  filterBusiness(business: BusinessPayloadType) {
    delete business.admins;
    delete business.backgroundAdmins;
    delete business.superAdmins;
    delete business.deleted;
    delete business.isRegistrationCompleted;
    delete business.createdBy;
    return business;
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
    business: BusinessPayloadType,
    isRegistration?: boolean
  ): Promise<Business> {
    const filteredBusiness = this.filterBusiness(business);
    if (isRegistration) filteredBusiness.isRegistrationCompleted = true;
    const updatedBusiness = await this.businessModel.findByIdAndUpdate(
      filteredBusiness._id,
      filteredBusiness,
      { new: true }
    );

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      updatedBusiness,
      userId
    );

    if (isAdmin || isSuperAdmin) {
      return await updatedBusiness.save();
    }
  }

  async registerBusiness(
    userId: string,
    business: BusinessPayloadType
  ): Promise<Business> {
    if (business.services.length === 0) {
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to register business\n missing: services.",
        statusCode: 412,
      });
    }
    if (business.categories.length === 0) {
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to register business\n missing: categories.",
        statusCode: 412,
      });
    }
    return this.updateBusiness(userId, business, true);
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
