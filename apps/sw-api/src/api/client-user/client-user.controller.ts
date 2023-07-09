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

import { ClientUserService } from "./client-user.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { AtGuard } from "../../common/guards";

@ApiTags("client-user")
@Controller("client-user")
@ApiBearerAuth("bearer")
@UseGuards(AtGuard)
export class ClientUserController {
  constructor(private readonly clientUsersService: ClientUserService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  get(@Res() res, @Param("id") userId: string) {
    if (!userId) {
      throw new NotFoundException("Business User ID does not exist");
    }
    const user = this.clientUsersService.findById(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body("user") userData: CreateUserDto) {
  //   return this.clientUsersService.create(userData);
  // }

  // @Put()
  // @HttpCode(HttpStatus.ACCEPTED)
  // update(@Req() request, @Body("user") userData: UpdateUserDto) {
  //   return this.clientUsersService.update(request.user.sub, userData);
  // }

  // @Delete(":id")
  // delete(@Res() res, @Param() params) {
  //   this.clientUsersService.remove(params.slug);
  //   return res.status(HttpStatus.OK);
  // }
}
