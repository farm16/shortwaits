import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  ForbiddenException,
  NotFoundException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { AuthPayloadType, TokenPayloadType } from "@shortwaits/shared-types";

import { User } from "../users/entities/user.entity";
import { SignUpWithEmailDto } from "./dto/sign-up-with-email.dto";
import { SignInWithEmailDto } from "./dto/sign-in-with-email.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Business } from "../business/entities/business.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signUpLocal(dto: SignUpWithEmailDto): Promise<AuthPayloadType> {
    try {
      const user = await this.userModel.findOne({
        email: dto.email,
      });

      if (user) {
        throw new UnprocessableEntityException("Invalid email or username");
      }

      const salt: string = bcrypt.genSaltSync(
        Number(this.config.get("SALT_ROUNDS"))
      );
      const encodedPassword = bcrypt.hashSync(dto.password, salt);

      const currentUser = new this.userModel({
        ...dto,
        password: encodedPassword,
      });

      const newBusinessAccount = new this.businessModel({
        isRegistrationCompleted: false,
        admins: [currentUser._id],
        superAdmins: [currentUser._id],
        createdBy: [currentUser._id],
        updatedBy: [currentUser._id],
        staff: [currentUser._id],
      });

      const tokens = await this.signTokens(currentUser);
      const hashedRefreshToken = bcrypt.hashSync(tokens.refreshToken, salt);

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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signInLocal(dto: SignInWithEmailDto): Promise<AuthPayloadType> {
    const currentUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (!currentUser) {
      throw new NotFoundException("User not registered");
    }

    const isPasswordValid: boolean = bcrypt.compareSync(
      dto.password,
      currentUser.password
    );

    if (!isPasswordValid) {
      throw new ForbiddenException("Access Denied");
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

  async logout(userId: number): Promise<AuthPayloadType> {
    await this.userModel.findByIdAndUpdate(userId, {
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

  async refreshTokens(
    userId: string,
    rt: string
  ): Promise<{ auth: TokenPayloadType }> {
    // console.log('userId>>>', userId);
    // console.log('rt>>>', rt);

    const user = await this.userModel.findById(userId).exec();

    if (!user) throw new ForbiddenException("Unable to reauthenticate user");

    const rtMatches = bcrypt.compareSync(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException("Unable to reauthenticate");

    const signedTokens = await this.signTokens(user);

    console.log("signedTokens>>>", signedTokens);

    await this.updateRtHash(user, signedTokens.refreshToken);

    return { auth: signedTokens };
  }

  async updateRtHash(user: User, rt: string): Promise<void> {
    const salt: string = bcrypt.genSaltSync(
      Number(this.config.get("SALT_ROUNDS"))
    );
    const hash = bcrypt.hashSync(rt, salt);

    await this.userModel.findByIdAndUpdate(
      { _id: user._id },
      {
        hashedRt: hash,
        lastSignInAt: new Date(),
      }
    );
  }

  async signTokens(user: User): Promise<TokenPayloadType> {
    const payload = { sub: user._id, email: user.email };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: this.config.get<string>("AT_EXPIRES_IN"),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: this.config.get<string>("RT_EXPIRES_IN"),
      }),
    ]);

    return {
      token: at,
      refreshToken: rt,
    };
  }
}
