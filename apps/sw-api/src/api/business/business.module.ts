import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { BusinessSchema, Business } from "./entities/business.entity";
import { BusinessUserSchema, BusinessUser } from "../business-user/entities/business-user.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: BusinessUser.name, schema: BusinessUserSchema },
      { name: ClientUser.name, schema: ClientUserSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
