import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Events, EventsSchema } from "./entities/events.entity";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import {
  BusinessUser,
  BusinessUserSchema,
} from "../business-user/entities/business-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Events.name,
        schema: EventsSchema,
      },
      {
        name: Service.name,
        schema: ServiceSchema,
      },
      {
        name: Business.name,
        schema: BusinessSchema,
      },
      {
        name: BusinessUser.name,
        schema: BusinessUserSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
