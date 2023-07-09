// import { Model } from 'mongoose';
// import * as fs from 'fs';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import {
//   Injectable,
//   HttpException,
//   HttpStatus,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { TokenPayloadType, UserDocType } from '@shortwaits/shared-types';

// import { User } from '../user/user.schema';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AuthHelper {
//   constructor(
//     private config: ConfigService,
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//     private readonly jwt: JwtService,
//   ) {}

//   // Decoding the JWT Token
//   public async decode(token: string): Promise<unknown> {
//     return this.jwt.decode(token, null);
//   }

//   // Get User by User ID we get from decode()
//   public async validateUser(decoded: any): Promise<User> {
//     return this.userModel.findById(decoded.id);
//   }

//   // Generate JWT Token
//   public generateToken(user: UserDocType): TokenPayloadType {
//     const payload = {
//       email: user.email,
//       username: user.username,
//       sub: user._id,
//     };
//     const privateKey = fs.readFileSync('src/assets/private.pem');

//     const expiresIn = '1d';
//     const token = this.jwt.sign(payload, {
//       expiresIn,
//       privateKey,
//       secret: 'shortwaits',
//       algorithm: 'RS256',
//     });
//     const timestamp = new Date().toISOString();

//     return {
//       token,
//       expiresIn,
//       timestamp,
//     };
//   }

//   // Validate User's password
//   public isPasswordValid(password: string, userPassword: string): boolean {
//     return bcrypt.compareSync(password, userPassword);
//   }

//   // Encode User's password
//   public encodePassword(password: string): string {
//     const salt: string = bcrypt.genSaltSync(10);

//     return bcrypt.hashSync(password, salt);
//   }

//   // Validate JWT Token, throw forbidden error if JWT Token is invalid
//   private async validate(token: string): Promise<boolean | never> {
//     const decoded: unknown = this.jwt.verify(token);

//     if (!decoded) {
//       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
//     }

//     const user: User = await this.validateUser(decoded);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return true;
//   }
// }
