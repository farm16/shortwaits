import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessUser, BusinessUserSchema } from "../business-staff/entities/business-staff.entity";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";
import { Service, ServiceSchema } from "../services/entities/service.entity";
import { Events, EventsSchema } from "./entities/events.entity";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

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
      {
        name: ClientUser.name,
        schema: ClientUserSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
