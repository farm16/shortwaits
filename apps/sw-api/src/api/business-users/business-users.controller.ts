import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtGuard } from "../../common/guards";
import { BusinessUserService } from "./business-users.service";

@ApiTags("business-user")
@Controller("business-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class BusinessUserController {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getBusinessUser(@Param("businessId") businessId: string) {
    // todo: validate permission with business
    console.log("businessId >>", businessId);
    return this.businessUserService.getBusinessUser(businessId);
  }
}
