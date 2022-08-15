import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Res,
  NotFoundException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
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
  async get(@Res() res, @Param("id") userId: string) {
    if (!userId) {
      throw new NotFoundException("User ID does not exist");
    }
    const user = await this.usersService.findById(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(":id")
  async update(
    @Res() res,
    @Body("id") userId: string,
    @Body("user") userData: UpdateUserDto
  ) {
    const updatedUser = await this.usersService.update(userId, userData);
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Post()
  async create(@Body("user") userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Delete(":id")
  async delete(@Res() res, @Param() params) {
    await this.usersService.remove(params.slug);
    return res.status(HttpStatus.OK);
  }
}
