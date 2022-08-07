import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocType } from '@shortwaits/shared-types';

import { User } from './entities/user.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async findAll(query: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = query;
    return await this.userModel.find().skip(offset).limit(limit).exec();
  }

  public async findByUserName(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userModel
      .findById({ _id: userId, deleted: false })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  public async create(createCustomerDto: CreateUserDto): Promise<UserDocType> {
    const newCustomer = await this.userModel.create(createCustomerDto);
    return newCustomer;
  }

  public async update(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<UserDocType> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto
    );
    if (!existingUser) {
      throw new NotFoundException(`Customer #${userId} not found`);
    }
    return existingUser;
  }

  public async remove(userId: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userId);
    return deletedUser;
  }
}
