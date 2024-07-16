import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "../../business-services/entities/business-service.entity";
import { BusinessUser, BusinessUserSchema } from "../../business-users/entities/business-user.entity";
import { Business, BusinessSchema } from "../../business/entities/business.entity";
import { Client, ClientUserSchema } from "../../clients/entities/client.entity";
import { LocalClient, LocalClientUserSchema } from "../../local-clients/entities/local-client.entity";
import { Event, EventsSchema } from "../entities/event.entity";
import { BusinessEventsController } from "./client-events.controller";
import { BusinessEventsService } from "./client-events.service";

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
        name: LocalClient.name,
        schema: LocalClientUserSchema,
      },
    ]),
  ],
  controllers: [BusinessEventsController],
  providers: [BusinessEventsService],
})
export class ClientEventsModule {}
