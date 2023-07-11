import { Model, Types } from "mongoose";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocType } from "@shortwaits/shared-types";

import { BusinessUser } from "./entities/business-user.entity";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class BusinessUsersService {
  constructor(
    @InjectModel(BusinessUser.name)
    private readonly businessUserModel: Model<BusinessUser>
  ) {}

  async findAll(query: PaginationQueryDto): Promise<BusinessUser[]> {
    const { limit, offset } = query;
    return await this.businessUserModel.find().skip(offset).limit(limit).exec();
  }

  async findByUserName(username: string): Promise<BusinessUser | undefined> {
    try {
      return await this.businessUserModel
        .findOne({ username: username })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<BusinessUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    try {
      const businessUser = await this.businessUserModel
        .findById({ _id: id, deleted: false })
        .exec();
      console.log("businessUser >>>", businessUser);
      return businessUser;
    } catch (error) {
      console.log("businessUser error >>>", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createCustomerDto: CreateUserDto): Promise<BusinessUser> {
    try {
      const newCustomer = await this.businessUserModel.create(
        createCustomerDto
      );
      return newCustomer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<UserDocType> {
    const existingUser = await this.businessUserModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto
    );
    if (!existingUser) {
      throw new NotFoundException(`Customer #${userId} not found`);
    }
    return existingUser;
  }

  async remove(userId: string): Promise<any> {
    const deletedUser = await this.businessUserModel.findByIdAndRemove(userId);
    return deletedUser;
  }
}
