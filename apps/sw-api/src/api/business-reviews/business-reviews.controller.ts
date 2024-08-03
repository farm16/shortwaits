import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { BusinessReviewsService } from "./business-reviews.service";

const print = value => console.log("EventTransactionsController >>>", value);

@UseGuards(AtGuard)
@ApiTags("business-reviews")
@Controller("business-reviews")
@ApiBearerAuth("bearer")
export class BusinessReviewsController {
  constructor(private readonly businessReviewsService: BusinessReviewsService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getBusinessReviews(@Param("businessId") businessId: string) {
    print(businessId);
    return this.businessReviewsService.getBusinessReviews(businessId);
  }
}
