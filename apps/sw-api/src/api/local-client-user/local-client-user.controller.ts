import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LocalClientDtoType } from "@shortwaits/shared-lib";
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
    return this.clientUsersService.getLocalClientUsersForBusiness(businessId);
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessLocalClients(@Param("businessId") businessId: string, @Body() localClients: CreateLocalClientUserDto[]) {
    return this.clientUsersService.createLocalClientUsersForBusiness(businessId, localClients);
  }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async updateBusinessLocalClient(@Param("businessId") businessId: string, @Body() localClient: LocalClientDtoType) {
    return this.clientUsersService.updateLocalClientUserForBusiness(businessId, localClient);
  }
}
