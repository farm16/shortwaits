import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Service, ServiceSchema } from "../business-services/entities/business-service.entity";
import { BusinessUser, BusinessUserSchema } from "../business-users/entities/business-user.entity";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { Client, ClientUserSchema } from "../clients/entities/client.entity";
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
      { name: Client.name, schema: ClientUserSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Business.name, schema: BusinessSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [AtStrategy, RtStrategy, PassportModule],
})
export class AuthModule {}
