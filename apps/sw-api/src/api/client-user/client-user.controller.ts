import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { ClientUserDtoType } from "@shortwaits/shared-lib";
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
    return this.clientUsersService.getClientUsersForBusiness(businessId);
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessClients(@Param("businessId") businessId: string, @Body() clientUses: CreateClientUserDto[]) {
    return this.clientUsersService.createClientUsersForBusiness(businessId, clientUses);
  }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async updateBusinessClients(@Param("businessId") businessId: string, @Body() clientUser: ClientUserDtoType) {
    return this.clientUsersService.updateClientUserForBusiness(businessId, clientUser);
  }

  @Put(":clientId")
  @HttpCode(HttpStatus.OK)
  async updateClients(@Param("clientId") clientId: string, @Body() dto: CreateClientUserDto) {
    return null;
  }
}
