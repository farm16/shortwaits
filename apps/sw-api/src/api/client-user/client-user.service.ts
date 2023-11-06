import { Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { Business } from "../business/entities/business.entity";
import { CreateClientUserDto } from "./dto";
import { ClientUser } from "./entities/client-user.entity";

@Injectable()
export class ClientUserService {
  constructor(
    @InjectModel(ClientUser.name)
    private readonly clientUserModel: Model<ClientUser>,
    @InjectModel(Business.name)
    private readonly businessModel: Model<Business>
  ) {}

  async getClientUsersForBusiness(businessId: string) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (business.localClients?.length === 0) {
        return [];
      }
      // look for multiple ids in clientUserModel
      const localClientUsers = await this.clientUserModel.find({ _id: { $in: business.localClients } }).exec();
      return localClientUsers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createClientUsersForBusiness(businessId: string, localClientUsers: CreateClientUserDto[]) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (localClientUsers?.length === 0) {
        throw new PreconditionFailedException(`No local clients provided`);
      }
      // todo we might need to limit on the number of local clients that can be created at once or in total
      const newLocalClientUsers = await this.clientUserModel.create(localClientUsers);
      return newLocalClientUsers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // updates a single local client user
  async updateClientUserForBusiness(businessId: string, localClientUser: ClientUserDtoType) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (!localClientUser) {
        throw new PreconditionFailedException(`No local client provided`);
      }
      const updatedLocalClientUser = await this.clientUserModel.findByIdAndUpdate(localClientUser._id, localClientUser, { new: true });
      return updatedLocalClientUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
