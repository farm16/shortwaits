// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortwaitsAdmin = require("../../assets/default-data/3-shortwaits/shortwaits.js");
import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { BusinessType, BusinessUserType, ClientUserType, ObjectId } from "@shortwaits/shared-lib";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { Model } from "mongoose";
import { noop } from "rxjs";
import {
  convertToLowercase,
  filterBusinessOwnerPayload_localAuth,
  filterBusinessOwnerPayload_socialAuth,
  generateBusinessUser,
  generateUniqueId,
  getNewClientPayload,
  getSupportedLocales,
} from "../../utils";
import { BusinessUser } from "../business-staff/entities/business-staff.entity";
import { Business } from "../business/entities/business.entity";
import { ClientUser } from "../client-user/entities/client-user.entity";
import { Service } from "../services/entities/service.entity";
import { ClientSignInWithEmailDto, ClientSignUpWithEmailDto, SignInWithEmailDto, SignUpWithEmailDto } from "./dto";

const providers = ["google", "facebook"];
const googleApiOauthUrl = "https://www.googleapis.com/oauth2/v3";
@Injectable()
export class AuthService {
  private readonly maxAttempts = 10;
  private readonly oAuth2Client: OAuth2Client;

  constructor(
    @InjectModel(ClientUser.name)
    private clientUserModel: Model<ClientUser>,
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

  async businessSocialSignUp(dto: { authCode: string; provider: string }, storeIndicator = "en") {
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
        return await this.successfulExistingBusinessUser(user);
      }

      const newUser = filterBusinessOwnerPayload_socialAuth(userInfo);
      return await this.createNewBusinessAndBusinessOwner(newUser, storeIndicator);
    } catch (error) {
      console.error("Error in businessSocialSignUp:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }

  async businessSocialSignIn(dto: { authCode: string; provider: string }, storeIndicator = "en") {
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
        const newUser = filterBusinessOwnerPayload_socialAuth(userInfo);
        return await this.createNewBusinessAndBusinessOwner(newUser, storeIndicator);
      }

      return await this.successfulExistingBusinessUser(user);
    } catch (error) {
      console.error("Error in businessSocialSignIn:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }

  async businessLocalSignUp(newBusinessUserDto: SignUpWithEmailDto, storeIndicator = "en") {
    const user = await this.businessUserModel.findOne({
      email: newBusinessUserDto.email,
    });

    if (user) {
      return await this.successfulExistingBusinessUser(user);
    }

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const encodedPassword = await bcrypt.hash(newBusinessUserDto.password, salt);

    const filteredBusinessUser = filterBusinessOwnerPayload_localAuth(newBusinessUserDto);
    return await this.createNewBusinessAndBusinessOwner(
      {
        ...filteredBusinessUser,
        password: encodedPassword,
      },
      storeIndicator
    );
  }

  // this is for Shortwaits user (Not Admin)
  async clientLocalSignUp(newUserClient: ClientSignUpWithEmailDto, locale: string) {
    const user = await this.clientUserModel.findOne({
      email: newUserClient.email,
    });

    if (user) {
      return await this.successfulExistingBusinessUser(user);
    }

    return await this.createNewClient({
      clientUser: newUserClient,
      businesses: [],
      locale,
    });
  }

  async clientLocalSignIn(dto: ClientSignInWithEmailDto) {
    const user = await this.clientUserModel.findOne({
      email: convertToLowercase(dto.email),
    });

    if (!user) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid password or email");
    }

    return await this.successfulExistingClientUser(user);
  }

  async businessLocalSignIn(dto: SignInWithEmailDto) {
    const user = await this.businessUserModel.findOne({
      email: convertToLowercase(dto.email), // we only auth via email
    });

    if (!user) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid password or username");
    }

    return await this.successfulExistingBusinessUser(user);
  }

  async logout(userId: number) {
    console.log("logout business user id: ", userId);
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

  async clientLogout(userId: number) {
    console.log("logout client user id: ", userId);
    await this.clientUserModel.findByIdAndUpdate(userId, {
      hashedRt: null,
    });
    return {
      auth: null,
      attributes: {
        currentUser: null,
      },
    };
  }

  async businessRefreshToken(userId: string, rt: string) {
    const user = await this.businessUserModel.findById(userId).exec();

    if (!user) {
      throw new ForbiddenException("Unable to reauthenticate user");
    }

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) {
      throw new ForbiddenException("Unable to reauthenticate");
    }

    const signedTokens = await this.signTokens(user);
    await this.updateBusinessUserRt(user, signedTokens.refreshToken);

    return { auth: signedTokens, attributes: { currentUser: user } };
  }

  async clientRefreshToken(userId: string, rt: string) {
    const user = await this.clientUserModel.findById(userId).exec();

    if (!user) {
      throw new ForbiddenException("Unable to reauthenticate user");
    }

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) {
      throw new ForbiddenException("Unable to reauthenticate");
    }

    const signedTokens = await this.signTokens(user);
    await this.updateClientUserRt(user, signedTokens.refreshToken);

    return { auth: signedTokens, attributes: { currentUser: user } };
  }

  private async updateBusinessUserRt(user: BusinessUser, rt: string): Promise<void> {
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

  private async updateClientUserRt(user: ClientUser, rt: string): Promise<void> {
    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(rt, salt);

    await this.clientUserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        hashedRt: hash,
        lastSignInAt: new Date(),
      }
    );
  }

  private async signTokens(userInfo: { _id: string; email: string }) {
    const payload = { sub: userInfo._id, email: userInfo.email };

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

  private async generateBusinessShortUniqueId(): Promise<string | null> {
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const generatedId = generateUniqueId();
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

  async successfulExistingBusinessUser(existingUser) {
    const signedTokens = await this.signTokens(existingUser);
    await this.updateBusinessUserRt(existingUser, signedTokens.refreshToken);

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

  async successfulExistingClientUser(existingUser) {
    const signedTokens = await this.signTokens(existingUser);
    await this.updateClientUserRt(existingUser, signedTokens.refreshToken);

    delete existingUser.password;

    return {
      auth: signedTokens,
      attributes: {
        currentUser: existingUser,
      },
    };
  }

  async createNewBusinessAndBusinessOwner(newUser: BusinessUserType, storeIndicator = "en") {
    const storeIndicators = {
      en: "0000001",
      es: "0000002",
    };

    const currentShortwaitsAdmin = shortwaitsAdmin.find(shortWaits => shortWaits.short_id === storeIndicators[storeIndicator]) ?? shortwaitsAdmin[0];

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);

    const userPayload = generateBusinessUser(newUser, ["superAdmin", "backgroundAdmin", "admin"]);
    const currentUser = new this.businessUserModel(userPayload);

    const businessShortId = await this.generateBusinessShortUniqueId();
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
      localClients: null,
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

  async createNewClient({ clientUser, businesses = [], locale = "es" }: { clientUser: Partial<ClientUserType>; businesses: ObjectId[]; locale: string }) {
    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);

    const newClientUser = new this.clientUserModel(clientUser);
    const encodedPassword = await bcrypt.hash(newClientUser.password, salt);
    const tokens = await this.signTokens(newClientUser);
    const hashedRt = await bcrypt.hash(tokens.refreshToken, salt);

    const userPayload = getNewClientPayload({
      email: newClientUser.email,
      username: newClientUser.email,
      displayName: newClientUser?.displayName ?? "",
      familyName: newClientUser?.familyName ?? "",
      givenName: newClientUser?.givenName ?? "",
      middleName: newClientUser?.middleName ?? "",
      businesses: businesses,
      password: encodedPassword,
      hashedRt: hashedRt,
      clientType: "external",
      locale: getSupportedLocales(locale),
    });

    newClientUser.set(userPayload);

    const clientUserCreated = await newClientUser.save();

    clientUserCreated.password = null;

    return {
      auth: tokens,
      attributes: {
        currentUser: clientUserCreated,
      },
    };
  }
}
