import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ShortwaitsController } from "./shortwaits.controller";
import { Shortwaits, ShortwaitsSchema } from "./shortwaits.schema";
import { ShortwaitsService } from "./shortwaits.service";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { ClientUser, ClientUserSchema } from "../client-user/entities/client-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shortwaits.name, schema: ShortwaitsSchema },
      { name: Business.name, schema: BusinessSchema },
      { name: ClientUser.name, schema: ClientUserSchema },
    ]),
  ],
  controllers: [ShortwaitsController],
  providers: [ShortwaitsService],
})
export class ShortwaitsModule {}
