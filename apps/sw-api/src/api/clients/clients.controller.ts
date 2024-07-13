import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientDtoType } from "@shortwaits/shared-lib";
import { AtGuard } from "../../common/guards";
import { ClientUserService } from "./clients.service";
import { CreateClientUserDto } from "./dto";

@UseGuards(AtGuard)
@ApiTags("clients")
@Controller("clients")
@ApiBearerAuth("bearer")
export class ClientUserController {
  constructor(private readonly clientUsersService: ClientUserService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getClientByBusiness(@Param("businessId") businessId: string) {
    console.log("businessId", businessId);
    return this.clientUsersService.getClientUsersForBusiness(businessId);
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessClients(@Param("businessId") businessId: string, @Body() clientUses: CreateClientUserDto[]) {
    return this.clientUsersService.createClientUsersForBusiness(businessId, clientUses);
  }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async updateBusinessClients(@Param("businessId") businessId: string, @Body() clientUser: ClientDtoType) {
    return this.clientUsersService.updateClientUserForBusiness(businessId, clientUser);
  }

  @Put("business/:businessId/local-clients")
  @HttpCode(HttpStatus.OK)
  async updateClientToBusiness(@Param("businessId") businessId: string, @Body() body: { shortId: string }) {
    return this.clientUsersService.addClientUserToBusiness(businessId, body.shortId);
  }

  @Delete("business/:businessId/local-clients")
  @HttpCode(HttpStatus.OK)
  async deleteClientToBusiness(@Param("businessId") businessId: string, @Body() body: { shortId: string }) {
    return this.clientUsersService.addClientUserToBusiness(businessId, body.shortId);
  }

  @Get(":clientShortId")
  @HttpCode(HttpStatus.OK)
  async searchClients(@Param("clientShortId") clientShortId: string) {
    return this.clientUsersService.getClient(clientShortId);
  }
}
