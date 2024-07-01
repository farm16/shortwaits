import { ForbiddenException, Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  AddClientsDtoType,
  BusinessDtoType,
  BusinessHoursType,
  BusinessType,
  CreateBusinessUsersDtoType,
  DeleteLocalClientsDtoType,
  ObjectId,
  PartialBusinessUserDtoType,
  UpdateClientDtoType,
} from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { convertStringToObjectId } from "../../utils/converters";
import { generateBusinessStaff, generateClientUsers } from "../../utils/generateUserPayload";
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

  async createBusinessLocalClients(businessUserId: string, businessId: string, clients: AddClientsDtoType) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (isAdmin || isSuperAdmin) {
      const clientsPayload = generateClientUsers(clients);
      const insertedClients = await this.localClientUserModel.insertMany(clientsPayload);
      const insertedLocalClientsIds = insertedClients.map(client => {
        return client._id;
      });

      const updatedBusiness = await this.businessModel.findByIdAndUpdate(
        businessId,
        {
          $push: { localClients: insertedLocalClientsIds },
        },
        { new: true }
      );

      const newLocalClients = await this.localClientUserModel.find({
        _id: {
          $in: updatedBusiness.localClients,
        },
        deleted: false, // although we are creating new clients, we want to make sure that we are not returning deleted clients
      });
      return newLocalClients;
    }
  }

  async deleteBusinessLocalClients(businessUserId: string, businessId: string, clients: DeleteLocalClientsDtoType) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (isAdmin || isSuperAdmin) {
      const clientsIds = clients.map(client => {
        return client._id;
      });

      const updateManyResult = await this.localClientUserModel.updateMany(
        {
          _id: {
            $in: clientsIds,
          },
        },
        { deleted: true }
      );

      if (updateManyResult.modifiedCount === 0) {
        throw new NotFoundException("No clients found");
      }

      const _clients = await this.localClientUserModel.find({
        _id: {
          $in: clientsIds,
        },
        deleted: true,
      });

      const deletedClientsIds = _clients.map(client => client._id);
      const updatedClients = businessData.localClients.filter(client => !deletedClientsIds.includes(client));
      const updatedBusiness = await this.businessModel.findByIdAndUpdate(
        businessId,
        {
          localClients: updatedClients,
        },
        { new: true }
      );

      console.log("updatedBusiness >>>", updatedBusiness);

      const updatedLocalClients = await this.localClientUserModel.find({
        _id: {
          $in: updatedBusiness.localClients,
        },
        deleted: false, // although we are creating new clients, we want to make sure that we are not returning deleted clients
      });

      return updatedLocalClients;
    }
  }

  async getAllClients(businessUserId: string, businessId: string) {
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
          deleted: false,
        })
        .select("-__v -hashedRt");

      const clients = await this.clientUserModel
        .find({
          _id: {
            $in: businessData.clients,
          },
          deleted: false,
        })
        .select("-__v -hashedRt");

      //create new array with all clients without mutating the original arrays
      return {
        localClients,
        clients,
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

  // STAFF

  // staff helpers
  async getActiveBusinessStaffRecords(staffIds: ObjectId[], projection = "-__v -hashedRt") {
    const staffRecords = await this.businessUserModel
      .find({
        _id: {
          $in: staffIds,
        },
        deleted: false,
      })
      .select(projection);

    return staffRecords;
  }

  async getBusinessStaff(businessId: string, userId: string) {
    try {
      const businessData = await this.findBusinessById(businessId);
      const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
      if (isAdmin || isSuperAdmin) {
        const staff = await this.getActiveBusinessStaffRecords(businessData.staff);
        return staff;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createBusinessStaff(businessUserId: string, businessId: string, staff: CreateBusinessUsersDtoType) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (!isAdmin && !isSuperAdmin) {
      throw new ForbiddenException("Not enough permissions");
    }

    try {
      const staffPayload = generateBusinessStaff(staff, businessId);
      const insertedStaff = await this.businessUserModel.insertMany(staffPayload);
      const staffIds = insertedStaff.map(client => client._id);

      const newBusinessRecord = await this.businessModel.findByIdAndUpdate(
        businessId,
        {
          $push: { staff: staffIds },
        },
        { new: true }
      );

      const newStaff = await this.businessUserModel.find({
        _id: {
          $in: newBusinessRecord.staff,
        },
        deleted: false,
      });

      console.log("newBusinessRecord >>>", newBusinessRecord);
      console.log("newStaff >>>", newStaff);

      return newStaff;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBusinessStaff(businessUserId: string, businessId: string, staff: PartialBusinessUserDtoType) {
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

  async deleteBusinessStaff(businessUserId: string, businessId: string, staff: PartialBusinessUserDtoType) {
    try {
      const businessData = await this.findBusinessById(businessId);
      const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

      if (isAdmin || isSuperAdmin) {
        const staffId = convertStringToObjectId(staff._id);
        const isStaff = businessData.staff.includes(staffId);

        if (!isStaff) {
          throw new ForbiddenException("Unrecognized staff");
        }

        const updatedClient = await this.businessUserModel.findByIdAndUpdate(staff._id, { deleted: true });
        const updatedBusiness = await this.businessModel.findByIdAndUpdate(businessId, { $pull: { staff: updatedClient._id } }, { new: true });
        const newClients = await this.getActiveBusinessStaffRecords(updatedBusiness.staff);
        return newClients;
      } else {
        throw new ForbiddenException("Not enough permissions");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
