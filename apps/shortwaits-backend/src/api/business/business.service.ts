import { Model, Types } from "mongoose";
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
  BusinessHoursType,
  BusinessPayloadType,
  BusinessUserType,
} from "@shortwaits/shared-types";
import { Business } from "./entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { BusinessUser } from "../business-user/entities/business-user.entity";

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    private config: ConfigService
  ) {}

  isUserAdminType(business: Business, userId: Types.ObjectId) {
    const isAdmin = business.admins.includes(userId);
    const isSuperAdmin = business.superAdmins.includes(userId);
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

  async findBusinessById(businessId: Types.ObjectId) {
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
  async getBusiness(
    businessId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<Business> {
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
    userId: Types.ObjectId,
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
    userId: Types.ObjectId,
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
    businessId: Types.ObjectId,
    userId: Types.ObjectId,
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
    businessId: Types.ObjectId,
    key: keyof BusinessType
  ): Promise<Business[keyof BusinessType]> {
    const data = await this.businessModel
      .findById(businessId, String(key))
      .exec();
    // console.log("findByKey>>>", businessId, key, data);
    return data[key];
  }

  async getStaff(businessId: Types.ObjectId, userId: Types.ObjectId) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );
    if (isAdmin || isSuperAdmin) {
      console.log("finding staff");
      const staff = this.businessUserModel
        .find({
          _id: {
            $in: businessData.staff,
          },
        })
        .select("-__v -hashedRt");
      return staff;
    }
  }

  async createBusinessClients(
    businessId: Types.ObjectId,
    clients: BusinessUserType[]
  ) {
    const insertedClients = await this.businessUserModel.insertMany(clients);
    const clientsIds = insertedClients.map((client) => {
      return client._id;
    });
    await this.businessModel.findOneAndUpdate(businessId, {
      $push: { clients: clientsIds },
    });
  }
}
