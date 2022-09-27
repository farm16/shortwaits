import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServicesService } from "../services/services.service";

import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { BusinessSchema, Business } from "./entities/business.entity";
import {
  BusinessUserSchema,
  BusinessUser,
} from "../business-user/entities/business-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: BusinessUser.name, schema: BusinessUserSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
