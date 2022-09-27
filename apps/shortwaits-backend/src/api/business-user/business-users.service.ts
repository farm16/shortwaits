import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserPayloadType } from "@shortwaits/shared-types";

import { BusinessUser } from "./entities/business-user.entity";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class BusinessUsersService {
  constructor(
    @InjectModel(BusinessUser.name)
    private readonly businessUserModel: Model<BusinessUser>
  ) {}

  public async findAll(query: PaginationQueryDto): Promise<BusinessUser[]> {
    const { limit, offset } = query;
    return await this.businessUserModel.find().skip(offset).limit(limit).exec();
  }

  public async findByUserName(
    username: string
  ): Promise<BusinessUser | undefined> {
    return await this.businessUserModel.findOne({ username: username }).exec();
  }

  public async findById(userId: string): Promise<BusinessUser> {
    const businessUser = await this.businessUserModel
      .findById({ _id: userId, deleted: false })
      .exec();
    if (!businessUser) {
      throw new NotFoundException(`BusinessUser #${userId} not found`);
    }
    return businessUser;
  }

  public async create(
    createCustomerDto: CreateUserDto
  ): Promise<UserPayloadType> {
    const newCustomer = await this.businessUserModel.create(createCustomerDto);
    return newCustomer;
  }

  public async update(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<UserPayloadType> {
    const existingUser = await this.businessUserModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto
    );
    if (!existingUser) {
      throw new NotFoundException(`Customer #${userId} not found`);
    }
    return existingUser;
  }

  public async remove(userId: string): Promise<any> {
    const deletedUser = await this.businessUserModel.findByIdAndRemove(userId);
    return deletedUser;
  }
}
