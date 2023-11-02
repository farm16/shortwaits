import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LocalClientUser, LocalClientUserSchema } from "./entities/local-client-user.entity";
import { LocalClientUserController } from "./local-client-user.controller";
import { LocalClientUserService } from "./local-client-user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LocalClientUser.name,
        schema: LocalClientUserSchema,
      },
    ]),
  ],
  providers: [LocalClientUserService],
  controllers: [LocalClientUserController],
})
export class LocalClientUserModule {}
