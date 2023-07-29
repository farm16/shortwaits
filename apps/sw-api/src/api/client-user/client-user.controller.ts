import { Post, Body, Controller, HttpStatus, UseGuards, HttpCode } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { ClientUserService } from "./client-user.service";
import { CreateClientUserDto } from "./dto";
import { AtGuard } from "../../common/guards";

@ApiTags("client-user")
@Controller("client-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class ClientUserController {
  constructor(private readonly clientUsersService: ClientUserService) {}

  @Post("multiple")
  @HttpCode(HttpStatus.OK)
  async getMultipleUsers(@Body() userIds: string[]) {
    // todo: validate permission with business
    console.log("userIds", userIds);
    return await this.clientUsersService.findMultiple(userIds);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateClientUserDto) {
    return await this.clientUsersService.create(dto);
  }
}
