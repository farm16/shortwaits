import { ForbiddenException, Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
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
import { convertStringIdToObjectId, getUpdatedBusinessFromDto } from "../../utils/common";
import { generateBusinessStaff } from "../../utils/generateUserPayload";
import { BusinessUser } from "../business-users/entities/business-user.entity";
import { Client } from "../clients/entities/client.entity";
import { LocalClient } from "../local-clients/entities/local-client.entity";
import { Business } from "./entities/business.entity";

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name)
    private businessModel: Model<Business>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    @InjectModel(Client.name)
    private clientUserModel: Model<Client>,
    @InjectModel(LocalClient.name)
    private localClientUserModel: Model<LocalClient>
  ) {}

  isUserAdminType(business: Business, userId: string | ObjectId) {
    let id;

    if (typeof userId === "string") {
      id = convertStringIdToObjectId(userId);
    } else {
      id = userId;
    }

    const isAdmin = business.admins.includes(id);
    const isSuperAdmin = business.superAdmins.includes(id);

    if (isAdmin || isSuperAdmin) {
      return { isAdmin, isSuperAdmin };
    } else {
      throw new ForbiddenException("Not enough permissions");
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
  async getBusiness(businessId: string, userId: string) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);

    if (isAdmin || isSuperAdmin) {
      return businessData;
    }
  }

  async updateBusiness(userId: string, businessId: string, payload: BusinessDtoType, isRegistrationCompleted: boolean) {
    let filteredPayload = getUpdatedBusinessFromDto(payload, userId, ["isRegistrationCompleted"]);

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

  async registerBusiness(userId: string, business: BusinessDtoType) {
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

  async createBusinessLocalClients(businessUserId: ObjectId, businessId: ObjectId, localClients: Partial<LocalClient>[]) {
    const businessData = await this.findBusinessById(businessId);

    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    if (!isAdmin && !isSuperAdmin) {
      throw new ForbiddenException("Not enough permissions");
    }

    if (!localClients || localClients.length === 0) {
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create clients\n missing: clients.",
        statusCode: 412,
      });
    }

    try {
      const insertedLocalClients = await this.localClientUserModel.insertMany(localClients);
      const insertedLocalClientsIds = insertedLocalClients.map(client => {
        return client._id;
      });

      let updatedBusiness;

      if (businessData.localClients && businessData.localClients.length > 0) {
        updatedBusiness = await this.businessModel.findByIdAndUpdate(
          businessId,
          {
            $push: {
              localClients: {
                $each: insertedLocalClientsIds,
              },
            },
          },
          { new: true }
        );
      } else {
        updatedBusiness = await this.businessModel.findByIdAndUpdate(
          businessId,
          {
            localClients: insertedLocalClientsIds,
          },
          { new: true }
        );
      }

      const newLocalClients = await this.localClientUserModel.find({
        _id: {
          $in: updatedBusiness.localClients,
        },
        deleted: false, // although we are creating new clients, we want to make sure that we are not returning deleted clients
      });

      return newLocalClients;
    } catch (error) {
      console.log(error);
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

    const clientStringIds = businessData?.localClients ? businessData.localClients.map(client => client.toString()) : [];

    if (!clientStringIds.includes(client._id)) {
      throw new ForbiddenException("Unrecognized client");
    }

    if (isAdmin || isSuperAdmin) {
      await this.localClientUserModel.findOneAndUpdate({ _id: client._id }, client);
      const updatedClients = await this.localClientUserModel.find({
        _id: {
          $in: businessData.localClients,
        },
        deleted: false,
      });
      return updatedClients;
    }
  }

  // STAFF

  // staff helpers
  async getActiveBusinessUserRecords(staffIds: ObjectId[], projection = "-__v -hashedRt") {
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

  async getBusinessUser(businessId: string, userId: string) {
    try {
      const businessData = await this.findBusinessById(businessId);
      const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
      if (isAdmin || isSuperAdmin) {
        const staff = await this.getActiveBusinessUserRecords(businessData.staff);
        return staff;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createBusinessUser(businessUserId: string, businessId: string, staff: CreateBusinessUsersDtoType) {
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
          $push: {
            staff: {
              $each: staffIds,
            },
          },
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

  async updateBusinessUser(businessUserId: string, businessId: string, staff: PartialBusinessUserDtoType) {
    const businessData = await this.findBusinessById(businessId);
    const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

    const staffId = convertStringIdToObjectId(staff._id);
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

  async deleteBusinessUser(businessUserId: string, businessId: string, staff: PartialBusinessUserDtoType) {
    try {
      const businessData = await this.findBusinessById(businessId);
      const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);

      if (isAdmin || isSuperAdmin) {
        const staffId = convertStringIdToObjectId(staff._id);
        const isStaff = businessData.staff.includes(staffId);

        if (!isStaff) {
          throw new ForbiddenException("Unrecognized staff");
        }

        const updatedClient = await this.businessUserModel.findByIdAndUpdate(staff._id, { deleted: true });
        const updatedBusiness = await this.businessModel.findByIdAndUpdate(businessId, { $pull: { staff: updatedClient._id } }, { new: true });
        const newClients = await this.getActiveBusinessUserRecords(updatedBusiness.staff);
        return newClients;
      } else {
        throw new ForbiddenException("Not enough permissions");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
