import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtGuard } from "../../common/guards";
import { ClientUserService } from "./client-user.service";
import { CreateClientUserDto } from "./dto";

@ApiTags("client-user")
@Controller("client-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class ClientUserController {
  constructor(private readonly clientUsersService: ClientUserService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getClientByBusiness(@Param("businessId") businessId: string) {
    // todo: validate permission with business
    // return await this.clientUsersService.findMultiple(userIds);
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessClients(@Param("businessId") businessId: string, @Body() dto: CreateClientUserDto) {
    return await this.clientUsersService.create(dto);
  }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async updateBusinessClients(@Param("businessId") businessId: string, @Body() dto: CreateClientUserDto) {
    return await this.clientUsersService.create(dto);
  }

  @Put(":clientId")
  @HttpCode(HttpStatus.OK)
  async updateClients(@Param("clientId") clientId: string, @Body() dto: CreateClientUserDto) {
    return await this.clientUsersService.create(dto);
  }
}
