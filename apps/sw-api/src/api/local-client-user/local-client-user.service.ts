import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { LocalClientUser } from "./entities/local-client-user.entity";
// import { CreateClientUserDtoType } from "@shortwaits/shared-lib";
import { getFilteredClientUser } from "../../utils/filtersForDtos";
import { CreateLocalClientUserDto } from "./dto";

@Injectable()
export class LocalClientUserService {
  constructor(
    @InjectModel(LocalClientUser.name)
    private readonly clientUserModel: Model<LocalClientUser>
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

  async create(createCustomerDto: CreateLocalClientUserDto) {
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
