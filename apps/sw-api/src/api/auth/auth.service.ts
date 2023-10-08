// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortwaitsAdmin = require("../../assets/default-data/2-shortwaits/shortwaits.js");

import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { customAlphabet } from "nanoid";

import { BusinessUser } from "../business-user/entities/business-user.entity";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { convertDomainToLowercase } from "../../utils/converters";
import { getFilteredNewBusinessOwner, getNewUserFromSocialAccount } from "../../utils/filtersForDtos";
import { OAuth2Client } from "google-auth-library";
import { noop } from "rxjs";
import { BusinessType, BusinessUserType, ConvertToDtoType } from "@shortwaits/shared-lib";
import { generateBusinessUser } from "../../utils/generateUserPayload";

const providers = ["google", "facebook"];
const googleApiOauthUrl = "https://www.googleapis.com/oauth2/v3";
@Injectable()
export class AuthService {
  private readonly generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 16);
  private readonly maxAttempts = 10;
  private readonly oAuth2Client: OAuth2Client;

  constructor(
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    const googleAuthClientId = this.configService.get<string>("GOOGLE_AUTH_CLIENT_ID");
    const googleAuthClientSecret = this.configService.get<string>("GOOGLE_AUTH_CLIENT_SECRET");
    this.oAuth2Client = new OAuth2Client(googleAuthClientId, googleAuthClientSecret);
  }

  async signUpSocial(dto: { authCode: string; provider: string }, storeIndicator = "en") {
    if (!providers.includes(dto.provider)) {
      throw new UnprocessableEntityException("Invalid provider");
    }

    try {
      let userInfo;

      if (dto.provider === "google") {
        userInfo = await this.googleAuth(dto.authCode);
        // check if email is verified for google
      } else if (dto.provider === "facebook") {
        noop();
        // check if email is verified for facebook
      }

      const user = await this.businessUserModel.findOne({
        email: userInfo.email,
        isEmailVerified: true,
      });

      if (user) {
        return await this.successfulExistingUser(user);
      }

      const newUser = getNewUserFromSocialAccount(userInfo);
      return await this.createNewBusinessAndBusinessOwner(newUser, storeIndicator);
    } catch (error) {
      console.error("Error in signUpSocial:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }

  async signInSocial(dto: { authCode: string; provider: string }, storeIndicator = "en") {
    if (!providers.includes(dto.provider)) {
      throw new UnprocessableEntityException("Invalid provider");
    }

    try {
      let userInfo;

      if (dto.provider === "google") {
        userInfo = await this.googleAuth(dto.authCode);
        // check if email is verified for google
      } else if (dto.provider === "facebook") {
        noop();
        // check if email is verified for facebook
      }

      const user = await this.businessUserModel.findOne({
        email: userInfo.email,
        isEmailVerified: true,
      });

      if (!user) {
        const newUser = getNewUserFromSocialAccount(userInfo);
        return await this.createNewBusinessAndBusinessOwner(newUser, storeIndicator);
      }

      return await this.successfulExistingUser(user);
    } catch (error) {
      console.error("Error in signInSocial:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }

  async signUpLocal(newBusinessUserDto: SignUpWithEmailDto, storeIndicator = "en") {
    const user = await this.businessUserModel.findOne({
      username: newBusinessUserDto.username,
    });

    if (user) {
      return await this.successfulExistingUser(user);
    }

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const encodedPassword = await bcrypt.hash(newBusinessUserDto.password, salt);

    const filteredBusinessUser = getFilteredNewBusinessOwner(newBusinessUserDto);

    return await this.createNewBusinessAndBusinessOwner(
      {
        ...filteredBusinessUser,
        password: encodedPassword,
      },
      storeIndicator
    );
  }

  async signInLocal(dto: SignInWithEmailDto) {
    const user = await this.businessUserModel.findOne({
      username: convertDomainToLowercase(dto.username), // todo: this might be a problem
    });

    if (!user) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid password or username");
    }

    return await this.successfulExistingUser(user);
  }

  async logout(userId: number) {
    console.log("logout user id: ", userId);
    await this.businessUserModel.findByIdAndUpdate(userId, {
      hashedRt: null,
    });
    return {
      auth: null,
      attributes: {
        currentBusinessAccounts: null,
        currentUser: null,
      },
    };
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.businessUserModel.findById(userId).exec();

    if (!user) {
      throw new ForbiddenException("Unable to reauthenticate user");
    }

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) {
      throw new ForbiddenException("Unable to reauthenticate");
    }

    const signedTokens = await this.signTokens(user);
    await this.updateUserRt(user, signedTokens.refreshToken);

    return { auth: signedTokens };
  }

  private async updateUserRt(user: BusinessUser, rt: string): Promise<void> {
    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(rt, salt);

    await this.businessUserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        hashedRt: hash,
        lastSignInAt: new Date(),
      }
    );
  }

  private async signTokens(userInfo: BusinessUser) {
    const payload = { sub: userInfo._id, email: userInfo.email, username: userInfo.username };

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("AT_SECRET"),
        expiresIn: this.configService.get<string>("AT_EXPIRES_IN"),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("RT_SECRET"),
        expiresIn: this.configService.get<string>("RT_EXPIRES_IN"),
      }),
    ]);

    return {
      token,
      refreshToken,
    };
  }

  private async generateUniqueId(): Promise<string | null> {
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const generatedId = this.generateShortId().toLowerCase();
      const existingEntity = await this.businessModel.findOne({ shortId: generatedId });

      if (!existingEntity) {
        return generatedId;
      }
    }

    return null; // Return null when the maximum attempts are reached
  }

  async googleAuth(authCode: string) {
    const { tokens } = await this.oAuth2Client.getToken(authCode);
    const userInfoResponse = await fetch(`${googleApiOauthUrl}/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    if (!userInfoResponse.ok) {
      throw new InternalServerErrorException("Failed to fetch user information from Google.");
    }
    return await userInfoResponse.json();
  }

  async successfulExistingUser(existingUser) {
    const signedTokens = await this.signTokens(existingUser);
    await this.updateUserRt(existingUser, signedTokens.refreshToken);

    delete existingUser.password;

    // todo:
    // this is a problem if
    // the user has multiple businesses or 0 businesses
    // the app will not sign in the user with out a business
    // app grabs the first business in the array if
    // there are multiple businesses

    const currentBusinessAccounts = await this.businessModel
      .find({
        _id: {
          $in: existingUser.businesses,
        },
      })
      .select("-__v");

    return {
      auth: signedTokens,
      attributes: {
        currentBusinessAccounts,
        currentUser: existingUser,
      },
    };
  }

  async createNewBusinessAndBusinessOwner(newUser: ConvertToDtoType<BusinessUserType>, storeIndicator = "en") {
    const storeIndicators = {
      en: "0000001",
      es: "0000002",
    };

    const currentShortwaitsAdmin =
      shortwaitsAdmin.find(shortWaits => shortWaits.short_id === storeIndicators[storeIndicator]) ?? shortwaitsAdmin[0];

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);

    const userPayload = generateBusinessUser(newUser);
    const currentUser = new this.businessUserModel(userPayload);

    const businessShortId = await this.generateUniqueId();
    if (!businessShortId) {
      throw new UnprocessableEntityException("Unable to create business account for user");
    }
    const baseUrl = `https://${businessShortId}.shortwaits.com`;
    const webLogoImageUrl = "https://img.icons8.com/bubbles/50/shop.png";

    const newBusinessPayload: BusinessType = {
      shortId: businessShortId,
      isRegistrationCompleted: false,
      web: {
        isActive: true,
        baseUrl,
        bannerImageUrl: "",
        logoImageUrl: webLogoImageUrl,
        faviconImageUrl: "",
        primaryColor: "",
        secondaryColor: "",
        accentColor: "",
        notificationMessage: "",
      },
      clients: null,
      taggedClients: null,
      admins: [currentUser._id],
      superAdmins: [currentUser._id],
      backgroundAdmins: [currentUser._id],
      createdBy: currentUser._id,
      updatedBy: currentUser._id,
      staff: [currentUser._id],
      hours: currentShortwaitsAdmin.defaultBusinessData.hours,
      labels: currentShortwaitsAdmin.defaultBusinessData.labels,
      email: "",
      categories: [],
      services: [],
      events: [],
      description: "",
      currency: {
        name: "",
        code: "",
        symbol: "",
        codeNumber: 0,
        decimalSeparator: 0,
      },
      country: "",
      phone1: "",
      shortName: "",
      longName: "",
      location: {
        formattedAddress: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        coordinates: [0, 0],
      },
      deleted: false,
      accountType: "free",
      isWebBookingEnabled: true,
      isSmsNotificationEnabled: false,
      isAppNotificationEnabled: true,
      videoConference: [],
      isVideoConferenceEnabled: false,
      isDisabled: false,
    };

    const newBusinessAccount = new this.businessModel(newBusinessPayload);
    const services = currentShortwaitsAdmin.defaultBusinessData.services.map(service => {
      return { ...service, businessId: newBusinessAccount._id };
    });
    // create default labels (3) for the business from shortwaitsAdmin template
    const labels = currentShortwaitsAdmin.defaultBusinessData.labels;

    const newBusinessServices = await this.serviceModel.insertMany(services);
    const servicesIds = newBusinessServices.map(service => service._id);

    const tokens = await this.signTokens(currentUser);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);

    newBusinessAccount.services = servicesIds;
    newBusinessAccount.labels = labels;

    currentUser.businesses = [newBusinessAccount._id];
    currentUser.hashedRt = hashedRefreshToken;
    currentUser.lastSignInAt = new Date();

    const [newUserDoc, newBusinessAccDoc] = await Promise.all([currentUser.save(), newBusinessAccount.save()]);

    newUserDoc.password = null;

    return {
      auth: tokens,
      attributes: {
        currentBusinessAccounts: [newBusinessAccDoc],
        currentUser: newUserDoc,
      },
    };
  }
}
