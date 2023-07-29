import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUser, GetCurrentUserId, Public } from "../../common/decorators/auth.decorator";
import { AtGuard, RtGuard } from "../../common/guards";
import { AuthSuccessResponse, AuthRefreshSuccessResponse } from "./auth.interface";

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
  async signUpLocal(@Body(new ValidationPipe()) dto: SignUpWithEmailDto) {
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
  async signInLocal(@Body(new ValidationPipe()) body: SignInWithEmailDto) {
    console.log("signInLocal controller", body);
    return this.authService.signInLocal(body);
  }

  @UseGuards(AtGuard)
  @ApiBearerAuth("bearer")
  @Post("admin/local/sign-out")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Revokes tokens",
  })
  async logout(@Req() request) {
    console.log("logout controller", request.user.sub);
    await this.authService.logout(request.user.sub);
  }

  @UseGuards(RtGuard)
  @Post("admin/local/refresh")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns refreshed token",
  })
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser("refreshToken") refreshToken: string
  ): Promise<AuthRefreshSuccessResponse> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
