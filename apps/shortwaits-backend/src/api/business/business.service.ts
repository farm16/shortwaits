import mongoose, { Model, Types } from "mongoose";
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
  ClientUserType,
  BusinessUserType,
  ObjectId,
} from "@shortwaits/shared-types";
import { Business } from "./entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { BusinessUser } from "../business-user/entities/business-user.entity";
import { ClientUser } from "../client-user/entities/client-user.entity";

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name)
    private businessModel: Model<Business>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    @InjectModel(ClientUser.name)
    private clientUserModel: Model<ClientUser> // @InjectModel(Service.name) // private serviceModel: Model<Service>, // private config: ConfigService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isUserAdminType(business: Business, userId: any) {
    const id = new mongoose.mongo.ObjectId(userId);
    // console.log(id, userId);
    const isAdmin = business.admins.includes(id);
    const isSuperAdmin = business.superAdmins.includes(id);

    if (isAdmin || isSuperAdmin) {
      return { isAdmin, isSuperAdmin };
    } else {
      throw new ForbiddenException("Not enough permissions");
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

  async findBusinessById(businessId: string) {
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
  ): Promise<Business[keyof BusinessType]> {
    const data = await this.businessModel
      .findById(businessId, String(key))
      .exec();
    data;
    if (data) {
      return data[key];
    } else {
      throw new ForbiddenException("No data available");
    }
  }

  async getUsers(
    userType: "staff" | "client",
    businessId: string,
    userId: string
  ) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      userId
    );
    if (isAdmin || isSuperAdmin) {
      if (userType === "staff") {
        const staff = this.businessUserModel
          .find({
            _id: {
              $in: businessData.staff,
            },
          })
          .select("-__v -hashedRt");
        return staff;
      } else if (userType === "client") {
        const clients = this.clientUserModel
          .find({
            _id: {
              $in: businessData.clients,
            },
          })
          .select("-__v -hashedRt");
        return clients;
      }
    }
  }

  async createBusinessStaff(
    businessUserId: string,
    businessId: string,
    staff: BusinessUserType[]
  ) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      businessUserId
    );

    if (isAdmin || isSuperAdmin) {
      const insertedStaff = await this.businessUserModel.insertMany(staff);
      const staffIds = insertedStaff.map((client) => {
        return client._id;
      });
      await this.businessModel.findByIdAndUpdate(businessId, {
        $push: { staff: staffIds },
      });
      return insertedStaff;
    }
  }

  async createBusinessClients(
    businessUserId: string,
    businessId: string,
    clients: ClientUserType[]
  ) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(
      businessData,
      businessUserId
    );

    if (isAdmin || isSuperAdmin) {
      const insertedClients = await this.clientUserModel.insertMany(clients);
      const clientsIds = insertedClients.map((client) => {
        return client._id;
      });
      const businessClients = businessData.clients.concat(clientsIds);
      console.log("business ID >>> ", businessId);
      console.log("inserting clients >>> ", businessClients);
      const updatedBusiness = await this.businessModel.findByIdAndUpdate(
        businessId,
        {
          clients: businessClients,
        }
      );
      await updatedBusiness.save();

      return insertedClients;
    }
  }
}
