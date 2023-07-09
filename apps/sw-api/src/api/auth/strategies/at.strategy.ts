import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwtPayload.type";
import { Model } from "mongoose";
import { BusinessUser } from "../../business-user/entities/business-user.entity";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectModel(BusinessUser.name)
    private businessUserModal: Model<BusinessUser>,
    config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("AT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    // const user = await this.businessUserModal.findById(payload.sub);
    // delete user.password;
    // return user;
    return payload;
  }
}
