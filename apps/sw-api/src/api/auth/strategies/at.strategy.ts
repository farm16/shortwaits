import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { BusinessUser } from "../../business-staff/entities/business-user.entity";
import { JwtPayload } from "../types/jwtPayload.type";

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

  validate(payload: JwtPayload) {
    console.log("validate/payload >>>", payload);
    // const user = await this.businessUserModal.findById(payload.sub);
    // delete user.password;
    // return user;
    return payload;
  }
}
