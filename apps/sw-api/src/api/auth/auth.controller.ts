import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { WithSocialAuthDto } from "./dto/sign-up-with-social.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUser, GetCurrentUserId, Public } from "../../common/decorators/auth.decorator";
import { AtGuard, RtGuard } from "../../common/guards";
import { AuthSuccessResponse, AuthRefreshSuccessResponse } from "./auth.interface";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("admin/social/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async signUpSocial(
    @Body(new ValidationPipe()) dto: WithSocialAuthDto,
    @Headers("device-suggested-language") locale: string
  ) {
    return this.authService.signUpSocial(dto, locale);
  }

  @Public()
  @Post("admin/social/sign-in")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async signInSocial(
    @Body(new ValidationPipe()) dto: WithSocialAuthDto,
    @Headers("device-suggested-language") locale: string
  ) {
    return this.authService.signInSocial(dto, locale);
  }

  @Public()
  @Post("admin/local/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async signUpLocal(
    @Body(new ValidationPipe()) dto: SignUpWithEmailDto,
    @Headers("device-suggested-language") locale: string
  ) {
    return this.authService.signUpLocal(dto, locale);
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
