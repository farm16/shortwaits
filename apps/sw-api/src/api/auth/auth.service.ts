import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { BusinessUser } from "../business-user/entities/business-user.entity";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { convertDomainToLowercase } from "../../utils/converters";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortwaitsAdmin = require("../../assets/default-data/2-shortwaits/shortwaits.js");

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUpLocal(dto: SignUpWithEmailDto) {
    const existingUser = await this.businessUserModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new UnprocessableEntityException("Invalid email or username");
    }

    const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
    const salt = await bcrypt.genSalt(saltRounds);
    const encodedPassword = await bcrypt.hash(dto.password, salt);

    const currentUser = new this.businessUserModel({
      ...dto,
      password: encodedPassword,
    });

    const newBusinessAccount = new this.businessModel({
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
    const services = shortwaitsAdmin[0].sampleBusinessData.services.map(
      service => {
        return { ...service, businessId: newBusinessAccount._id };
      }
    );
    // create default labels (3) for the business from shortwaitsAdmin template

    const labels = shortwaitsAdmin[0].sampleBusinessData.labels;

    const insertedServices = await this.serviceModel.insertMany(services);
    const servicesIds = insertedServices.map(service => service._id);

    const tokens = await this.signTokens(currentUser);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);

    newBusinessAccount.services = servicesIds;
    newBusinessAccount.labels = labels;

    currentUser.businesses = [newBusinessAccount._id];
    currentUser.hashedRt = hashedRefreshToken;
    currentUser.lastSignInAt = new Date();

    const [newUserDoc, newBusinessAccDoc] = await Promise.all([
      currentUser.save(),
      newBusinessAccount.save(),
    ]);

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
      email: convertDomainToLowercase(dto.email),
    });

    if (!currentUser) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      currentUser.password
    );

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

  private async signTokens(user: BusinessUser) {
    const payload = { sub: user._id, email: user.email };

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
}
