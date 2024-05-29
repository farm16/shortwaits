import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { BusinessUser, BusinessUserSchema } from "../business-staff/entities/business-staff.entity";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AtStrategy } from "./strategies/at.strategy";
import { RtStrategy } from "./strategies/rt.strategy";

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: BusinessUser.name, schema: BusinessUserSchema },
      { name: ClientUser.name, schema: ClientUserSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Business.name, schema: BusinessSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [AtStrategy, RtStrategy, PassportModule],
})
export class AuthModule {}
