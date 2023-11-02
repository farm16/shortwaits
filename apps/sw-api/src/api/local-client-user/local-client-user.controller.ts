import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
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

  @Get(":localClientId")
  @HttpCode(HttpStatus.OK)
  async getLocalClientUsers(@Body() userIds: string[]) {
    // todo: validate permission with business
    console.log("userIds", userIds);
    return await this.clientUsersService.findMultiple(userIds);
  }

  @Get(":localClientId")
  @HttpCode(HttpStatus.OK)
  async getLocalClientUsersByBusiness(@Body() userIds: string[]) {
    // todo: validate permission with business
    return await this.clientUsersService.findMultiple(userIds);
  }

  @Post(":businessId")
  @HttpCode(HttpStatus.CREATED)
  async createBusinessLocalClients(@Body() dto: CreateLocalClientUserDto) {
    return await this.clientUsersService.create(dto);
  }
}
