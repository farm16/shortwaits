import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  HttpCode,
  BadRequestException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { BusinessUsersService } from "./business-users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { AtGuard } from "../../common/guards";

@ApiTags("business-user")
@Controller("business-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class BusinessUsersController {
  constructor(private readonly usersService: BusinessUsersService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  get(@Param("id") userId: string) {
    if (!userId) {
      throw new BadRequestException("missing ID");
    }
    return this.usersService.findById(userId);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Req() request, @Body("user") userData: UpdateUserDto) {
    return this.usersService.update(request.user.sub, userData);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body("user") userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Delete(":id")
  delete(@Param("id") userId: string) {
    this.usersService.remove(userId);
    return "User deleted successfully";
  }
}
