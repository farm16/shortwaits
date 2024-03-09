import { ForbiddenException, Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  AddClientsDtoType,
  BusinessDtoType,
  BusinessHoursType,
  BusinessType,
  BusinessUserUpdateDtoType,
  CreateBusinessUsersDtoType,
  UpdateClientDtoType,
} from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { convertStringToObjectId } from "../../utils/converters";
import { generateBusinessStaffUsers, generateClientUsers } from "../../utils/generateUserPayload";
import { BusinessUser } from "../business-staff/entities/business-staff.entity";
import { ClientUser } from "../client-user/entities/client-user.entity";
import { LocalClientUser } from "../local-client-user/entities/local-client-user.entity";
import { RegisterBusinessDto } from "./dto/registerBusiness.dto";
import { Business } from "./entities/business.entity";

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name)
    private businessModel: Model<Business>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    @InjectModel(ClientUser.name)
    private clientUserModel: Model<ClientUser>,
    @InjectModel(LocalClientUser.name)
    private localClientUserModel: Model<LocalClientUser>
  ) {}

  isUserAdminType(business: Business, userId: any) {
    const id = convertStringToObjectId(userId);
    const isAdmin = business.admins.includes(id);
    const isSuperAdmin = business.superAdmins.includes(id);

    if (isAdmin || isSuperAdmin) {
      return { isAdmin, isSuperAdmin };
    } else {
      throw new ForbiddenException("Not enough permissions");
    }
  }

  filterBusiness(business: Partial<BusinessDtoType>) {
    delete business._id;
    delete business.createdAt;
    delete business.updatedAt;
    delete business.shortId;
    delete business.updatedBy;
    delete business.accountType;
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
  async getBusiness(businessId: string, userId: string) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);

    if (isAdmin || isSuperAdmin) {
      return businessData;
    }
  }

  async updateBusiness(userId: string, businessId: string, payload: Partial<BusinessDtoType>, isRegistrationCompleted: boolean) {
    let filteredPayload = this.filterBusiness(payload);

    if (isRegistrationCompleted) {
      console.log("isRegistrationCompleted", isRegistrationCompleted);
      filteredPayload = {
        ...filteredPayload,
        isRegistrationCompleted: true,
      };
    }

    const updatedBusiness = await this.businessModel.findByIdAndUpdate(businessId, filteredPayload, {
      new: true,
    });

    if (!updatedBusiness) {
      throw new NotFoundException("Business not available");
    }

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(updatedBusiness, userId);

    if (isAdmin || isSuperAdmin) {
      return await updatedBusiness.save();
    } else {
      throw new ForbiddenException("Not enough permissions");
    }
  }

  async registerBusiness(userId: string, business: RegisterBusinessDto) {
    console.log("registerBusiness ****");
    const isRegistrationCompleted = true;

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

    const updatedBusiness = this.updateBusiness(userId, business._id, business, isRegistrationCompleted);
    return updatedBusiness;
  }

  async updateBusinessHours(businessId: string, userId: string, dto: { hours: BusinessHoursType }) {
    const businessData = await this.businessModel.findOne({ _id: businessId }, null, { new: true });

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
    if (isAdmin || isSuperAdmin) {
      businessData.hours = dto.hours;
      console.log({ ...dto });
      return await businessData.save();
    }
  }

  async findByKey(businessId: string, key: keyof BusinessType) {
    const data = await this.businessModel.findById(businessId, String(key)).exec();
    data;
    if (data) {
      return data[key];
    } else {
      throw new ForbiddenException("No data available");
    }
  }

  async getBusinessStaff(businessId: string, userId: string) {
    const businessData = await this.findBusinessById(businessId);
    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
    if (isAdmin || isSuperAdmin) {
      const staff = await this.businessUserModel
        .find({
          _id: {
            $in: businessData.staff,
          },
        })
        .select("-__v -hashedRt");
      return staff;
    }
  }

  async createBusinessStaff(businessUserId: string, businessId: string, staff: CreateBusinessUsersDtoType) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (isAdmin || isSuperAdmin) {
      const staffPayload = generateBusinessStaffUsers(staff);
      const insertedStaff = await this.businessUserModel.insertMany(staffPayload);
      const staffIds = insertedStaff.map(client => {
        return client._id;
      });
      await this.businessModel.findByIdAndUpdate(businessId, {
        $push: { staff: staffIds },
      });
      const newStaff = await this.businessUserModel.find({
        businesses: {
          $in: [businessId],
        },
      });
      return newStaff;
    }
  }

  async createBusinessLocalClients(businessUserId: string, businessId: string, clients: AddClientsDtoType) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (isAdmin || isSuperAdmin) {
      const clientsPayload = generateClientUsers(clients);
      const insertedClients = await this.localClientUserModel.insertMany(clientsPayload);
      const clientsIds = insertedClients.map(client => {
        return client._id;
      });
      const businessClients = businessData.clients ? businessData.clients.concat(clientsIds) : clientsIds;
      const business = await this.businessModel.findByIdAndUpdate(
        businessId,
        {
          clients: businessClients,
        },
        { new: true }
      );

      const updatedBusiness = await business.save();
      const newClients = await this.localClientUserModel.find({
        _id: {
          $in: updatedBusiness.clients,
        },
      });
      return newClients;
    }
  }

  async getAllBusinessClientsService(businessUserId: string, businessId: string) {
    if (!businessId || !businessUserId) {
      throw new ForbiddenException("Unrecognized business or user");
    }

    const businessData = await this.findBusinessById(businessId);
    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (isAdmin || isSuperAdmin) {
      const localClients = await this.localClientUserModel
        .find({
          _id: {
            $in: businessData.localClients,
          },
        })
        .select("-__v -hashedRt");

      const clients = await this.clientUserModel
        .find({
          _id: {
            $in: businessData.clients,
          },
        })
        .select("-__v -hashedRt");

      //create new array with all clients without mutating the original arrays
      const allClients = [...localClients, ...clients];
      return {
        localClients,
        clients,
        allClients,
      };
    } else {
      throw new ForbiddenException("Not enough permissions");
    }
  }

  async updateBusinessLocalClient(businessUserId: string, businessId: string, client: UpdateClientDtoType) {
    const businessData = await this.findBusinessById(businessId);
    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    const clientId = convertStringToObjectId(client._id);
    const isClient = businessData.clients.includes(clientId);

    if (!isClient) {
      throw new ForbiddenException("Unrecognized client");
    }

    if (isAdmin || isSuperAdmin) {
      const updatedClient = await this.clientUserModel.findOneAndUpdate({ _id: client._id }, client, {
        new: true,
      });
      return updatedClient;
    }
  }

  async updateBusinessStaff(businessUserId: string, businessId: string, staff: BusinessUserUpdateDtoType) {
    const businessData = await this.findBusinessById(businessId);
    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    const staffId = convertStringToObjectId(staff._id);
    const isStaff = businessData.staff.includes(staffId);

    if (!isStaff) {
      throw new ForbiddenException("Unrecognized staff");
    }

    if (isAdmin || isSuperAdmin) {
      const updatedClient = await this.businessUserModel.findOneAndUpdate({ _id: staff._id }, staff, {
        new: true,
      });

      return updatedClient;
    }
  }
}
