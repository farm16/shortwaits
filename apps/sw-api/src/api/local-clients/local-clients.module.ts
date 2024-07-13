import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { LocalClientUser, LocalClientUserSchema } from "./entities/local-client-user.entity";
import { LocalClientUserController } from "./local-clients.controller";
import { LocalClientUserService } from "./local-clients.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
      {
        name: LocalClientUser.name,
        schema: LocalClientUserSchema,
      },
    ]),
  ],
  providers: [LocalClientUserService],
  controllers: [LocalClientUserController],
})
export class LocalClientsModule {}
