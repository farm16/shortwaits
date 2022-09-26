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
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { AtGuard } from "../../common/guards";

@ApiTags("users")
@Controller("users")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  get(@Res() res, @Param("id") userId: string) {
    if (!userId) {
      throw new NotFoundException("User ID does not exist");
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
  delete(@Res() res, @Param() params) {
    this.usersService.remove(params.slug);
    return res.status(HttpStatus.OK);
  }
}
