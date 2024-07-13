import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { CreateLocalClientUserDto } from "./dto";
import { LocalClientUserService } from "./local-clients.service";

@ApiTags("local-clients")
@Controller("local-clients")
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
}
