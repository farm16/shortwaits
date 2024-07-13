import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessUser, BusinessUserSchema } from "../../business-staff/entities/business-staff.entity";
import { Business, BusinessSchema } from "../../business/entities/business.entity";
import { Client, ClientUserSchema } from "../../clients/entities/client.entity";
import { LocalClientUser, LocalClientUserSchema } from "../../local-clients/entities/local-client-user.entity";
import { Service, ServiceSchema } from "../../services/entities/service.entity";
import { Event, EventsSchema } from "../entities/event.entity";
import { EventsController } from "./client-events.controller";
import { EventsService } from "./client-events.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
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
        name: Client.name,
        schema: ClientUserSchema,
      },
      {
        name: LocalClientUser.name,
        schema: LocalClientUserSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class ClientEventsModule {}
