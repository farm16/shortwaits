import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "../business-services/entities/business-service.entity";
import { BusinessUser, BusinessUserSchema } from "../business-users/entities/business-user.entity";
import { Client, ClientUserSchema } from "../clients/entities/client.entity";
import { LocalClient, LocalClientUserSchema } from "../local-clients/entities/local-client.entity";
import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { Business, BusinessSchema } from "./entities/business.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: BusinessUser.name, schema: BusinessUserSchema },
      { name: Client.name, schema: ClientUserSchema },
      { name: LocalClient.name, schema: LocalClientUserSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
