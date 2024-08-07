import { Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientDtoType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { Business } from "../business/entities/business.entity";
import { CreateClientUserDto } from "./dto";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    @InjectModel(Business.name)
    private readonly businessModel: Model<Business>
  ) {}

  async getClientUsersForBusiness(businessId: string) {
    try {
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (business.clients?.length === 0) {
        return [];
      }
      const clients = await this.clientModel.find({ _id: { $in: business.clients } }).exec();
      return clients;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createClientUsersForBusiness(businessId: string, localClients: CreateClientUserDto[]) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (localClients?.length === 0) {
        throw new PreconditionFailedException(`No clients provided`);
      }
      // todo we might need to limit on the number of local clients that can be created at once or in total
      const newLocalClientUsers = await this.clientModel.create(localClients);
      return newLocalClientUsers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // updates a single local client user
  async updateClientUserForBusiness(businessId: string, localClient: ClientDtoType) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (!localClient) {
        throw new PreconditionFailedException(`No client provided`);
      }
      const updatedLocalClientUser = await this.clientModel.findByIdAndUpdate(localClient._id, localClient, { new: true });
      return updatedLocalClientUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async addClientUserToBusiness(businessId: string, clientShortId: string) {
    try {
      // check business exists first else throw 404 then check if business has any users else throw 404 else return users
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business not found`);
      }
      if (!clientShortId) {
        throw new PreconditionFailedException(`No client short id provided`);
      }
      const userClient = await this.clientModel.findOne({ shortId: clientShortId }).exec();
      if (!userClient) {
        throw new NotFoundException(`Client #${clientShortId} not found`);
      }
      // check if client is already in business also clients be null
      if (business.clients?.includes(userClient._id)) {
        throw new PreconditionFailedException(`Client #${clientShortId} already exists in business`);
      }
      // add client to business but first check if clients is null
      if (!business.clients) {
        business.clients = [];
      }
      business.clients.push(userClient._id);

      await business.save();

      return business;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async searchClients(query: string) {
    try {
      return this.clientModel.find({ $text: { $search: query } }).exec();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getClient(clientShortId: string) {
    try {
      if (!clientShortId) {
        throw new PreconditionFailedException(`No client short id provided`);
      }
      const userClient = await this.clientModel.findOne({ clientShortId }).exec();
      if (!userClient) {
        throw new NotFoundException(`Client #${clientShortId} not found`);
      }
      // filter out sensitive data
      const { password, ...client } = userClient.toJSON();
      return client;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
