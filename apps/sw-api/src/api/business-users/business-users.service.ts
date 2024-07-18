import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Business } from "../business/entities/business.entity";
import { BusinessUser } from "./entities/business-user.entity";

@Injectable()
export class BusinessUserService {
  constructor(
    @InjectModel(BusinessUser.name)
    private readonly businessUserModel: Model<BusinessUser>,
    @InjectModel(Business.name)
    private readonly businessModel: Model<Business>
  ) {}

  //get business staff id then get records from businessUserModel
  async getBusinessUser(businessId: string) {
    try {
      const business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business #${businessId} not found`);
      }
      if (business.staff?.length === 0) {
        return [];
      }
      const businessStaff = await this.businessUserModel.find({ _id: { $in: business.staff } }).exec();
      return businessStaff;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
