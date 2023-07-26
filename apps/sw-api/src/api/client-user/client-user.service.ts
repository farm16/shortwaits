import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocType } from "@shortwaits/shared-lib";

import { ClientUser } from "./entities/client-user.entity";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class ClientUserService {
  constructor(
    @InjectModel(ClientUser.name)
    private readonly clientUserModel: Model<ClientUser>
  ) {}

  public async findAll(query: PaginationQueryDto): Promise<ClientUser[]> {
    const { limit, offset } = query;
    return await this.clientUserModel.find().skip(offset).limit(limit).exec();
  }

  public async findByUserName(
    username: string
  ): Promise<ClientUser | undefined> {
    return await this.clientUserModel.findOne({ username: username }).exec();
  }

  public async findById(userId: string): Promise<ClientUser> {
    const businessUser = await this.clientUserModel
      .findById({ _id: userId, deleted: false })
      .exec();
    if (!businessUser) {
      throw new NotFoundException(`ClientUser #${userId} not found`);
    }
    return businessUser;
  }

  // public async create(
  //   createCustomerDto: CreateUserDto
  // ): Promise<UserDocType> {
  //   const newCustomer = await this.clientUserModel.create(createCustomerDto);
  //   return newCustomer;
  // }

  // public async update(
  //   userId: string,
  //   updateUserDto: Partial<UpdateUserDto>
  // ): Promise<UserDocType> {
  //   const existingUser = await this.clientUserModel.findByIdAndUpdate(
  //     { _id: userId },
  //     updateUserDto
  //   );
  //   if (!existingUser) {
  //     throw new NotFoundException(`Customer #${userId} not found`);
  //   }
  //   return existingUser;
  // }

  public async remove(userId: string): Promise<any> {
    const deletedUser = await this.clientUserModel.findByIdAndRemove(userId);
    return deletedUser;
  }
}
