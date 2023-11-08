import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtGuard } from "../../common/guards";
import { BusinessStaffService } from "./business-staff.service";

@ApiTags("business-staff")
@Controller("business-staff")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class BusinessStaffController {
  constructor(private readonly businessUserService: BusinessStaffService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getBusinessStaff(@Param("businessId") businessId: string) {
    // todo: validate permission with business
    console.log("businessId >>", businessId);
    return this.businessUserService.getBusinessStaff(businessId);
  }

  // @Post("business/:businessId")
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Param(":businessId") businessId: string, @Body() dto: CreateBusinessUserDto) {
  //   return await this.businessUserService.create(dto);
  // }

  // @Put("business/:businessId")
  // @HttpCode(HttpStatus.OK)
  // async updateSingleBusinessStaff(@Param(":businessId") businessId: string, @Body() userIds: string[]) {
  //   // todo: validate permission with business
  //   return await this.businessUserService.findMultiple(userIds);
  // }

  // @Get(":staffId")
  // @HttpCode(HttpStatus.OK)
  // async getSingleBusinessStaff(@Param(":businessId") businessId: string, @Body() userIds: string[]) {
  //   // todo: validate permission with business
  //   return await this.businessUserService.findMultiple(userIds);
  // }
}
