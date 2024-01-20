import { Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LocalClientDtoType } from "@shortwaits/shared-utils";
import { Model } from "mongoose";
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
      const localClientUsers = await this.localClientUserModel.find({ _id: { $in: business.localClients ?? [] } }).exec();
      return localClientUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createLocalClientUsersForBusiness(businessId: string, localClientUsers: CreateLocalClientUserDto[]) {
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }

      if (localClientUsers?.length === 0) {
        return {
          localClientUsers: [],
          business: business,
        };
      }

      const newLocalClientUsersPayload = localClientUsers.map(localClientUser => {
        return getNewClientPayload({
          email: localClientUser.email,
          username: localClientUser.username,
          displayName: localClientUser.displayName,
          familyName: localClientUser.familyName,
          givenName: localClientUser.givenName,
          middleName: localClientUser.middleName,
          businesses: [business._id],
          hashedRt: "",
          clientType: "local",
          password: "",
          locale: getSupportedLocales("es"),
        });
      });
      const newLocalClientUsers = await this.localClientUserModel.create(newLocalClientUsersPayload);
      const newLocalClientUserIds = newLocalClientUsers.map(localClientUser => localClientUser._id);

      const uniqueLocalClientsIds = getUniqueIdArray([...newLocalClientUserIds, ...(business?.localClients ?? [])]);
      business.localClients = uniqueLocalClientsIds;

      const updatedBusiness = await business.save();
      const newLocalClients = await this.localClientUserModel.find({ _id: { $in: updatedBusiness?.localClients ?? [] } }).exec();

      return {
        localClientUsers: newLocalClients,
        business: updatedBusiness,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // updates a single local client user
  async updateLocalClientUserForBusiness(businessId: string, localClientUser: LocalClientDtoType) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (!localClientUser) {
        throw new PreconditionFailedException(`No local client provided`);
      }
      const updatedLocalClientUser = await this.localClientUserModel.findByIdAndUpdate(localClientUser._id, localClientUser, { new: true });
      return updatedLocalClientUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
