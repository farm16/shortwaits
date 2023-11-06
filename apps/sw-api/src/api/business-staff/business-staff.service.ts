import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { getFilteredBusinessUser } from "../../utils/filtersForDtos";
import { CreateBusinessUserDto, UpdateBusinessUserDto } from "./dto";
import { BusinessUser } from "./entities/business-staff.entity";

@Injectable()
export class BusinessStaffService {
  constructor(
    @InjectModel(BusinessUser.name)
    private readonly businessUserModel: Model<BusinessUser>
  ) {}

  async findMultiple(userIds: (string | ObjectId)[]) {
    if (!userIds || userIds.length === 0) {
      return [];
    }
    try {
      const uniqueUserIds = [...new Set(userIds)];
      const businessUsers = await this.businessUserModel.find({ _id: { $in: uniqueUserIds } }).exec();
      return businessUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createCustomerDto: CreateBusinessUserDto) {
    const existingUser = await this.businessUserModel.findOne({ username: createCustomerDto.username }).exec();
    if (existingUser) {
      throw new NotFoundException(`Business User #${createCustomerDto.username} already exists`);
    }
    try {
      const newCustomer = await this.businessUserModel.create(getFilteredBusinessUser(createCustomerDto));
      return newCustomer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByUserName(username: string): Promise<BusinessUser | undefined> {
    try {
      return await this.businessUserModel.findOne({ username: username }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<BusinessUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ID");
    }

    try {
      const businessUser = await this.businessUserModel.findById({ _id: id, deleted: false }).exec();
      console.log("businessUser >>>", businessUser);
      return businessUser;
    } catch (error) {
      console.log("businessUser error >>>", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(userId: string, UpdateBusinessUserDto: Partial<UpdateBusinessUserDto>) {
    const existingUser = await this.businessUserModel.findByIdAndUpdate({ _id: userId }, UpdateBusinessUserDto);
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
