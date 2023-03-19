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
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { BusinessUsersService } from "./business-users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { AtGuard } from "../../common/guards";

@ApiTags("business-user")
@Controller("business-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
@UseInterceptors(TransformInterceptor)
export class BusinessUsersController {
  constructor(private readonly usersService: BusinessUsersService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  get(@Res() res, @Param("id") userId: string) {
    if (!userId) {
      throw new NotFoundException("Business User ID does not exist");
    }
    const user = this.usersService.findById(userId);
    return res.status(HttpStatus.OK).json(user);
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
  delete(@Res() res, @Param("id") userId: string) {
    this.usersService.remove(userId);
    return res.status(HttpStatus.OK);
  }
}
