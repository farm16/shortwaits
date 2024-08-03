import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { BusinessReviewsController } from "./business-reviews.controller";
import { BusinessReviewsService } from "./business-reviews.service";
import { BusinessReviewModel } from "./models/business-review.model";

@Module({
  imports: [
    SequelizeModule.forFeature([BusinessReviewModel]),
    MongooseModule.forFeature([
      {
        name: Business.name,
        schema: BusinessSchema,
      },
    ]),
  ],
  controllers: [BusinessReviewsController],
  providers: [BusinessReviewsService],
})
export class BusinessReviewsModule {}
