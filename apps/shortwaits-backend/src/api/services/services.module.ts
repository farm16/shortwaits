import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "./entities/service.entity";
import { Business, BusinessSchema } from "../business/entities/business.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Service.name,
        schema: ServiceSchema,
      },
      { name: Business.name, schema: BusinessSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
