import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectModel as InjectSequelizeModel } from "@nestjs/sequelize";
import { Model } from "mongoose";
import { Business } from "../business/entities/business.entity";
import { BusinessReviewModel } from "./models/business-review.model";

@Injectable()
export class BusinessReviewsService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectSequelizeModel(BusinessReviewModel) private eventTransactionModel: typeof BusinessReviewModel
  ) {}

  async getBusinessReviews(businessId: string) {
    const business = await this.businessModel.findById(businessId);
    if (!business) {
      throw new NotFoundException("Business not found");
    }
    return this.eventTransactionModel.findAll({
      where: {
        businessId,
      },
    });
  }
}
