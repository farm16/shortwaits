import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtGuard } from "../../common/guards";
import { BusinessUsersService } from "./business-users.service";

@ApiTags("business-users")
@Controller("business-users")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class BusinessUsersController {
  constructor(private readonly businessUserService: BusinessUsersService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getBusinessUser(@Param("businessId") businessId: string) {
    // todo: validate permission with business
    console.log("businessId >>", businessId);
    return this.businessUserService.getBusinessUser(businessId);
  }
}
