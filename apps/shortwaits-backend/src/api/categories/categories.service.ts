import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Categories } from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoriesModel: Model<Categories>,
    private config: ConfigService,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    try {
      const Categories = await this.categoriesModel.find({});
      return Categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategory(CategoriesId: string): Promise<Categories> {
    const Categories = await this.categoriesModel
      .findById({
        _id: CategoriesId,
      })
      .exec();
    return Categories;
  }
}
