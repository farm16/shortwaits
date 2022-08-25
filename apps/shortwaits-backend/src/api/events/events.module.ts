import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Events, EventsSchema } from "./entities/events.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Events.name,
        schema: EventsSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
