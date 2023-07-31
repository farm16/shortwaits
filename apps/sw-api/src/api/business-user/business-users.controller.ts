import { Get, Post, Body, Put, Delete, Param, Controller, Req, HttpStatus, UseGuards, HttpCode } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { BusinessUserService } from "./business-users.service";
import { AtGuard } from "../../common/guards";
import { CreateBusinessUserDto } from "./dto";

@ApiTags("business-user")
@Controller("business-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class BusinessUsersController {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Post("multiple")
  @HttpCode(HttpStatus.OK)
  async getMultipleUsers(@Body() userIds: string[]) {
    // todo: validate permission with business
    return await this.businessUserService.findMultiple(userIds);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBusinessUserDto) {
    return await this.businessUserService.create(dto);
  }
}
