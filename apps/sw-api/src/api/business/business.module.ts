import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BusinessUser, BusinessUserSchema } from "../business-staff/entities/business-user.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { Business, BusinessSchema } from "./entities/business.entity";

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
