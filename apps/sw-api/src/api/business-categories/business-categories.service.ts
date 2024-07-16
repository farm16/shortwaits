import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BusinessCategory } from "./business-category.schema";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(BusinessCategory.name) private categoriesModel: Model<BusinessCategory>, private config: ConfigService) {}

  async getAllCategories(): Promise<BusinessCategory[]> {
    try {
      const categories = await this.categoriesModel.find({});
      return categories;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCategory(CategoriesId: string): Promise<BusinessCategory> {
    const BusinessCategory = await this.categoriesModel
      .findById({
        _id: CategoriesId,
      })
      .exec();
    return BusinessCategory;
  }
}
