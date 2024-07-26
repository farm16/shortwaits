import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { seeder } from "nestjs-seeder";
import { BusinessCategory, BusinessCategorySchema } from "./api/business-categories/business-category.schema";
import { Service, ServiceSchema } from "./api/business-services/entities/business-service.entity";
import { BusinessUser, BusinessUserSchema } from "./api/business-users/entities/business-user.entity";
import { Business, BusinessSchema } from "./api/business/entities/business.entity";
import { Client, ClientUserSchema } from "./api/clients/entities/client.entity";
import { Event, EventsSchema } from "./api/events/entities/event.entity";
import { LocalClient, LocalClientUserSchema } from "./api/local-clients/entities/local-client.entity";
import { Shortwaits, ShortwaitsSchema } from "./api/shortwaits/entities/shortwaits.entity";
import { getEnvPath } from "./common/env.helper";
import { MongoConfigService } from "./db/mongo/mongo.service";
import { SeederService } from "./db/seeders";
import { print } from "./utils";

const envFilePath = getEnvPath();
print({
  module: "Seeder",
  message: "env path",
  value: envFilePath,
});

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: BusinessCategory.name,
        schema: BusinessCategorySchema,
      },
      {
        name: Shortwaits.name,
        schema: ShortwaitsSchema,
      },
      {
        name: BusinessUser.name,
        schema: BusinessUserSchema,
      },
      {
        name: Business.name,
        schema: BusinessSchema,
      },
      {
        name: Event.name,
        schema: EventsSchema,
      },
      {
        name: Service.name,
        schema: ServiceSchema,
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
}).run([SeederService]);
