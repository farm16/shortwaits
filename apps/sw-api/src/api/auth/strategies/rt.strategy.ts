import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwtPayload.type";
import { JwtPayloadWithRt } from "../types/jwtPayloadWithRt.type";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("RT_SECRET"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req.headers.authorization.split(" ")[1].trim();
    if (!refreshToken) throw new UnauthorizedException("Refresh token malformed");

    return {
      ...payload,
      refreshToken,
    };
  }
}
