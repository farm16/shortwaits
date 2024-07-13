import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Business, BusinessSchema } from "../business/entities/business.entity";
import { ClientUserController } from "./clients.controller";
import { ClientUserService } from "./clients.service";
import { Client, ClientUserSchema } from "./entities/client.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientUserSchema,
      },
      {
        name: Business.name,
        schema: BusinessSchema,
      },
    ]),
  ],
  providers: [ClientUserService],
  controllers: [ClientUserController],
})
export class ClientsModule {}
