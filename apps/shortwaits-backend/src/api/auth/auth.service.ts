import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { AuthPayloadType, TokenPayloadType } from '@shortwaits/shared-types';

import { User } from '../users/entities/user.entity';
import { SignUpWithEmailDto } from './dto/sign-up-with-email.dto';
import { SignInWithEmailDto } from './dto/sign-in-with-email.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signUpLocal(dto: SignUpWithEmailDto): Promise<AuthPayloadType> {
    try {
      const user = await this.userModel.findOne({
        email: dto.email,
      });

      if (user) {
        throw new ForbiddenException('Incorrect credentials');
      }

      const salt: string = bcrypt.genSaltSync(
        Number(this.config.get('SALT_ROUNDS'))
      );
      const encodedPassword = bcrypt.hashSync(dto.password, salt);
      const newUser = await this.userModel.create({
        ...dto,
        password: encodedPassword,
      });

      const signedTokens = await this.signTokens(newUser);
      await this.updateRtHash(newUser, signedTokens.refreshToken);

      delete newUser.password;
      return { auth: signedTokens, data: newUser };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Auth error');
    }
  }

  async signInLocal(dto: SignInWithEmailDto): Promise<AuthPayloadType> {
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new NotFoundException('User not registered');
    }

    const isPasswordValid: boolean = bcrypt.compareSync(
      dto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Access Denied');
    }

    const signedTokens = await this.signTokens(user);
    await this.updateRtHash(user, signedTokens.refreshToken);

    delete user.password;
    return { auth: signedTokens, data: user };
  }

  async logout(userId: number): Promise<AuthPayloadType> {
    await this.userModel.findByIdAndUpdate(userId, {
      hashedRt: null,
    });
    return { auth: null, data: null };
  }

  async refreshTokens(
    userId: string,
    rt: string
  ): Promise<{ auth: TokenPayloadType }> {
    // console.log('userId>>>', userId);
    // console.log('rt>>>', rt);

    const user = await this.userModel.findById(userId).exec();

    if (!user) throw new ForbiddenException('Unable to reauthenticate user');

    const rtMatches = bcrypt.compareSync(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Unable to reauthenticate');

    const signedTokens = await this.signTokens(user);

    console.log('signedTokens>>>', signedTokens);

    await this.updateRtHash(user, signedTokens.refreshToken);

    return { auth: signedTokens };
  }

  async updateRtHash(user: User, rt: string): Promise<void> {
    const salt: string = bcrypt.genSaltSync(
      Number(this.config.get('SALT_ROUNDS'))
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
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: this.config.get<string>('AT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.config.get<string>('RT_EXPIRES_IN'),
      }),
    ]);

    return {
      token: at,
      refreshToken: rt,
    };
  }
}
