import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Business, BusinessSchema } from "../business/entities/business.entity";
import { ClientUserController } from "./client-user.controller";
import { ClientUserService } from "./client-user.service";
import { ClientUser, ClientUserSchema } from "./entities/client-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientUser.name,
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
export class ClientUserModule {}
