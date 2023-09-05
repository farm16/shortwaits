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
import { getFilteredNewBusinessOwner, getFilteredNewBusinessOwnerForGoogleUser } from "../../utils/filtersForDtos";
import { OAuth2Client } from "google-auth-library";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortwaitsAdmin = require("../../assets/default-data/2-shortwaits/shortwaits.js");

const providers = ["google", "facebook"];

@Injectable()
export class AuthService {
  private readonly generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
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

  async signUpSocial(dto: { authCode: string; provider: string }) {
    if (!providers.includes(dto.provider)) {
      throw new UnprocessableEntityException("Invalid provider");
    }

    try {
      let userInfo;

      if (dto.provider === "google") {
        const { tokens } = await this.oAuth2Client.getToken(dto.authCode);

        // Get user info using access token
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        if (!userInfoResponse.ok) {
          throw new InternalServerErrorException("Failed to fetch user information from Google.");
        }

        userInfo = await userInfoResponse.json();
        // eslint-disable-next-line no-empty
      } else if (dto.provider === "facebook") {
      }

      const existingUser = await this.businessUserModel.findOne({
        email: userInfo.email,
        isEmailVerified: true,
      });

      if (existingUser) {
        throw new UnprocessableEntityException("Invalid username");
      }

      const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
      const salt = await bcrypt.genSalt(saltRounds);

      const filteredBusinessUser = getFilteredNewBusinessOwnerForGoogleUser(userInfo);

      const currentUser = new this.businessUserModel(filteredBusinessUser);
      const businessShortId = await this.generateUnique();
      if (!businessShortId) {
        throw new UnprocessableEntityException("Unable to create business account for user");
      }
      const newBusinessAccount = new this.businessModel({
        shortId: businessShortId,
        isRegistrationCompleted: false,
        clients: [],
        taggedClients: [],
        admins: [currentUser._id],
        superAdmins: [currentUser._id],
        createdBy: [currentUser._id],
        updatedBy: [currentUser._id],
        staff: [currentUser._id],
        hours: shortwaitsAdmin[0].sampleBusinessData.hours,
      });

      const services = shortwaitsAdmin[0].sampleBusinessData.services.map(service => {
        return { ...service, businessId: newBusinessAccount._id };
      });

      // create default labels (3) for the business from shortwaitsAdmin template
      const labels = shortwaitsAdmin[0].sampleBusinessData.labels;

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
    } catch (error) {
      // Handle any errors here
      console.error("Error in signUpSocial:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }

  async signUpLocal(newBusinessUserDto: SignUpWithEmailDto) {
    const existingUser = await this.businessUserModel.findOne({
      username: newBusinessUserDto.username,
    });

    if (existingUser) {
      throw new UnprocessableEntityException("Invalid username");
    }

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const encodedPassword = await bcrypt.hash(newBusinessUserDto.password, salt);

    const filteredBusinessUser = getFilteredNewBusinessOwner(newBusinessUserDto);

    const currentUser = new this.businessUserModel({
      ...filteredBusinessUser,
      password: encodedPassword,
    });

    const businessShortId = await this.generateUnique();

    if (!businessShortId) {
      throw new UnprocessableEntityException("Unable to create business account for user");
    }

    const newBusinessAccount = new this.businessModel({
      shortId: businessShortId,
      isRegistrationCompleted: false,
      clients: [],
      taggedClients: [],
      admins: [currentUser._id],
      superAdmins: [currentUser._id],
      createdBy: [currentUser._id],
      updatedBy: [currentUser._id],
      staff: [currentUser._id],
      hours: shortwaitsAdmin[0].sampleBusinessData.hours,
    });

    // create default services (3) for the business from shortwaitsAdmin template
    const services = shortwaitsAdmin[0].sampleBusinessData.services.map(service => {
      return { ...service, businessId: newBusinessAccount._id };
    });

    // create default labels (3) for the business from shortwaitsAdmin template
    const labels = shortwaitsAdmin[0].sampleBusinessData.labels;

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

  async signInLocal(dto: SignInWithEmailDto) {
    const currentUser = await this.businessUserModel.findOne({
      username: convertDomainToLowercase(dto.username),
    });

    if (!currentUser) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, currentUser.password);

    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid password or username");
    }

    const signedTokens = await this.signTokens(currentUser);
    await this.updateRtHash(currentUser, signedTokens.refreshToken);

    delete currentUser.password;

    const currentBusinessAccounts = await this.businessModel
      .find({
        _id: {
          $in: currentUser.businesses,
        },
      })
      .select("-__v -hashedRt");

    return {
      auth: signedTokens,
      attributes: {
        currentBusinessAccounts,
        currentUser,
      },
    };
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
    await this.updateRtHash(user, signedTokens.refreshToken);

    return { auth: signedTokens };
  }

  private async updateRtHash(user: BusinessUser, rt: string): Promise<void> {
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

  async generateUnique(): Promise<string | null> {
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const generatedId = this.generateShortId();
      const existingEntity = await this.businessModel.findOne({ shortId: generatedId });

      if (!existingEntity) {
        return generatedId;
      }
    }

    return null; // Return null when the maximum attempts are reached
  }
}
