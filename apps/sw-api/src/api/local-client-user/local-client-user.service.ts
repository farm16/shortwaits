import { Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LocalClientDtoType } from "@shortwaits/shared-lib";
import { Model, Schema } from "mongoose";
import { getNewClientPayload, getSupportedLocales, getUniqueIdArray } from "../../utils";
import { Business } from "../business/entities/business.entity";
import { CreateLocalClientUserDto } from "./dto";
import { LocalClientUser } from "./entities/local-client-user.entity";

@Injectable()
export class LocalClientUserService {
  constructor(
    @InjectModel(LocalClientUser.name)
    private readonly localClientUserModel: Model<LocalClientUser>,
    @InjectModel(Business.name)
    private readonly businessModel: Model<Business>
  ) {}

  async getLocalClientUsersForBusiness(businessId: string) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (business?.localClients?.length === 0) {
        return [];
      }
      // look for multiple ids in localClientUserModel
      const localClients = await this.localClientUserModel.find({ _id: { $in: business.localClients ?? [] } }).exec();
      return localClients;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createLocalClientUsersForBusiness(businessId: string, localClients: CreateLocalClientUserDto[]) {
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }

      if (localClients?.length === 0) {
        return {
          localClients: [],
          business: business,
        };
      }

      const newLocalClientUsersPayload = localClients.map(localClient => {
        return getNewClientPayload({
          email: localClient.email,
          username: localClient.username,
          displayName: localClient.displayName,
          familyName: localClient.familyName,
          givenName: localClient.givenName,
          middleName: localClient.middleName,
          businesses: [business._id],
          hashedRt: "",
          clientType: "local",
          password: "",
          locale: getSupportedLocales("es"),
        });
      });
      const newLocalClientUsers = await this.localClientUserModel.create(newLocalClientUsersPayload);
      const newLocalClientUserIds = newLocalClientUsers.map(localClient => localClient._id);

      const uniqueLocalClientsIds = getUniqueIdArray([...newLocalClientUserIds, ...(business?.localClients ?? [])]);
      business.localClients = uniqueLocalClientsIds as Schema.Types.ObjectId[];

      const updatedBusiness = await business.save();
      const newLocalClients = await this.localClientUserModel.find({ _id: { $in: updatedBusiness?.localClients ?? [] } }).exec();

      return {
        localClients: newLocalClients,
        business: updatedBusiness,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // updates a single local client user
  async updateLocalClientUserForBusiness(businessId: string, localClient: LocalClientDtoType) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (!localClient) {
        throw new PreconditionFailedException(`No local client provided`);
      }
      const updatedLocalClientUser = await this.localClientUserModel.findByIdAndUpdate(localClient._id, localClient, { new: true });
      return updatedLocalClientUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
