import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { BusinessUser, BusinessUserSchema } from "../../business-staff/entities/business-staff.entity";
import { Business, BusinessSchema } from "../../business/entities/business.entity";
import { Client, ClientUserSchema } from "../../clients/entities/client.entity";
import { EventTransactionModel } from "../../event-transactions/models/event-transaction.model";
import { LocalClientUser, LocalClientUserSchema } from "../../local-clients/entities/local-client-user.entity";
import { Service, ServiceSchema } from "../../services/entities/service.entity";
import { Event, EventsSchema } from "../entities/event.entity";
import { EventsController } from "./business-events.controller";
import { EventsService } from "./business-events.service";

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
    SequelizeModule.forFeature([EventTransactionModel]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class BusinessEventsModule {}
