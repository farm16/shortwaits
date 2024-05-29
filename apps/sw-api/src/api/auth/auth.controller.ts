import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUser, GetCurrentUserId, Public } from "../../common/decorators/auth.decorator";
import { AtGuard, RtGuard } from "../../common/guards";
import { AuthRefreshSuccessResponse, AuthSuccessResponse } from "./auth.interface";
import { AuthService } from "./auth.service";
import { ClientSignInWithEmailDto, ClientSignUpWithEmailDto, SignInWithEmailDto, SignUpWithEmailDto, WithSocialAuthDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("business/sign-up/social")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async businessSocialSignUp(@Body(new ValidationPipe()) dto: WithSocialAuthDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.businessSocialSignUp(dto, locale);
  }

  @Public()
  @Post("business/sign-in/social")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async businessSocialSignIn(@Body(new ValidationPipe()) dto: WithSocialAuthDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.businessSocialSignIn(dto, locale);
  }

  @Public()
  @Post("business/sign-up/local-auth")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async businessLocalSignUp(@Body(new ValidationPipe()) dto: SignUpWithEmailDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.businessLocalSignUp(dto, locale);
  }

  @Public()
  @Post("business/sign-in/local-auth")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns existing user record",
    type: AuthSuccessResponse,
  })
  async businessLocalSignIn(@Body(new ValidationPipe()) body: SignInWithEmailDto) {
    return this.authService.businessLocalSignIn(body);
  }

  @UseGuards(AtGuard)
  @ApiBearerAuth("bearer")
  @Post("business/sign-out/local-auth")
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
  @ApiBearerAuth()
  @Post("business/refresh-token/local-auth")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns refreshed token",
  })
  async businessRefreshToken(@Req() request) {
    const userId = request.user.sub;
    const refreshToken = request.user.refreshToken;
    //console.log("request refresh token", refreshToken);
    //console.log("request user id", userId);
    return this.authService.businessRefreshToken(userId, refreshToken);
  }

  // Client

  @Public()
  @Post("client/social/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async clientSignUpSocial(@Body(new ValidationPipe()) dto: WithSocialAuthDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.businessSocialSignUp(dto, locale);
  }

  @Public()
  @Post("client/social/sign-in")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async clientSignInSocial(@Body(new ValidationPipe()) dto: WithSocialAuthDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.businessSocialSignIn(dto, locale);
  }

  @Public()
  @Post("client/local/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns new business user (super Admin) & business record",
    type: AuthSuccessResponse,
  })
  async clientLocalSignUp(@Body(new ValidationPipe()) dto: ClientSignUpWithEmailDto, @Headers("device-suggested-language") locale: string) {
    return this.authService.clientLocalSignUp(dto, locale);
  }

  @Public()
  @Post("client/local/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns existing user record",
    type: AuthSuccessResponse,
  })
  async clientLocalSignIn(@Body(new ValidationPipe()) body: ClientSignInWithEmailDto) {
    return this.authService.clientLocalSignIn(body);
  }

  @UseGuards(AtGuard)
  @ApiBearerAuth("bearer")
  @Post("client/local/sign-out")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Revokes tokens",
  })
  async clientLogout(@Req() request) {
    console.log("logout controller", request.user.sub);
    await this.authService.clientLogout(request.user.sub);
  }

  @UseGuards(RtGuard)
  @Post("client/local/refresh")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns refreshed token",
  })
  async clientRefreshToken(@GetCurrentUserId() userId: string, @GetCurrentUser("refreshToken") refreshToken: string): Promise<AuthRefreshSuccessResponse> {
    return this.authService.clientRefreshToken(userId, refreshToken);
  }
}
