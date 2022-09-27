import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ClientUserService } from "./client-user.service";
import { ClientUserController } from "./client-user.controller";
import { ClientUserSchema, ClientUser } from "./entities/client-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientUser.name,
        schema: ClientUserSchema,
      },
    ]),
  ],
  providers: [ClientUserService],
  controllers: [ClientUserController],
})
export class ClientUserModule {}
