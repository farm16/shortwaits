import { Model, ObjectId } from "mongoose";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientUser } from "./entities/client-user.entity";
// import { CreateClientUserDtoType } from "@shortwaits/shared-lib";
import { CreateClientUserDto } from "./dto";
import { getFilteredClientUser } from "../../utils/filtersForDtos";

@Injectable()
export class ClientUserService {
  constructor(
    @InjectModel(ClientUser.name)
    private readonly clientUserModel: Model<ClientUser>
  ) {}

  async findMultiple(userIds: string[] | ObjectId[]) {
    if (!userIds || !userIds.length) {
      return [];
    }
    try {
      const clientUsers = await this.clientUserModel.find({ _id: { $in: userIds } }).exec();
      return clientUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createCustomerDto: CreateClientUserDto) {
    const existingUser = await this.clientUserModel.findOne({ username: createCustomerDto.username }).exec();
    if (existingUser) {
      throw new NotFoundException(`User #${createCustomerDto.username} already exists`);
    }
    try {
      const newCustomer = await this.clientUserModel.create(getFilteredClientUser(createCustomerDto));
      return newCustomer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
