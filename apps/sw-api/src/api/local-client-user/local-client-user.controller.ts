import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtGuard } from "../../common/guards";
import { CreateLocalClientUserDto } from "./dto";
import { LocalClientUserService } from "./local-client-user.service";

@ApiTags("local-client-user")
@Controller("local-client-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class LocalClientUserController {
  constructor(private readonly clientUsersService: LocalClientUserService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getLocalClientByBusiness(@Param("businessId") businessId: string) {
    // todo: validate permission with business
    // return await this.clientUsersService.findMultiple(userIds);
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessLocalClients(@Param("businessId") businessId: string, @Body() dto: CreateLocalClientUserDto) {
    return await this.clientUsersService.create(dto);
  }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async updateBusinessLocalClient(@Param("businessId") businessId: string, @Body() dto: CreateLocalClientUserDto) {
    return await this.clientUsersService.create(dto);
  }
}
