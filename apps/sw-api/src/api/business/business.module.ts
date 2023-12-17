import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessUser, BusinessUserSchema } from "../business-staff/entities/business-staff.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";
import { LocalClientUser, LocalClientUserSchema } from "../local-client-user/entities/local-client-user.entity";
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
      { name: LocalClientUser.name, schema: LocalClientUserSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
