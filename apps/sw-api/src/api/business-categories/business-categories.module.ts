import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesController } from "./business-categories.controller";
import { CategoriesService } from "./business-categories.service";
import { BusinessCategory, CategoriesSchema } from "./business-category.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: BusinessCategory.name, schema: CategoriesSchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
