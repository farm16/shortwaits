import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthPayloadType, TokenPayloadType } from "@shortwaits/shared-types";
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from "../../common/decorators/auth.decorator";
import { RtGuard } from "../../common/guards";
import { AuthSuccessResponse } from "./auth.interface";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("admin/local/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new user & business record",
    type: AuthSuccessResponse,
  })
  signUpLocal(
    @Body(new ValidationPipe()) dto: SignUpWithEmailDto
  ): Promise<AuthPayloadType> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post("admin/local/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns existing user record",
    type: AuthSuccessResponse,
  })
  signInLocal(@Body(new ValidationPipe()) body: SignInWithEmailDto) {
    console.log("signInLocal controller", body);
    return this.authService.signInLocal(body);
  }

  @Post("sign-out")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Revokes tokens",
  })
  logout(@GetCurrentUserId() userId: number): Promise<AuthPayloadType> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns refreshed token",
  })
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser("refreshToken") refreshToken: string
  ): Promise<{ auth: TokenPayloadType }> {
    console.log("refreshTokens controller");
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
