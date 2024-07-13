import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { ClientsService } from "./clients.service";

@UseGuards(AtGuard)
@ApiTags("clients")
@Controller("clients")
@ApiBearerAuth("bearer")
export class ClientsController {
  constructor(private readonly clientUsersService: ClientsService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getClientByBusiness(@Param("businessId") businessId: string) {
    console.log("businessId", businessId);
    return this.clientUsersService.getClientUsersForBusiness(businessId);
  }

  @Put("business/:businessId/client")
  @HttpCode(HttpStatus.OK)
  async updateClientToBusiness(@Param("businessId") businessId: string, @Body() body: { shortId: string }) {
    console.log("client shortId", body.shortId);
    return this.clientUsersService.addClientUserToBusiness(businessId, body.shortId);
  }
}
