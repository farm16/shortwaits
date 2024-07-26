import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Business, BusinessSchema } from "../business/entities/business.entity";
import { Client, ClientUserSchema } from "../clients/entities/client.entity";
import { Shortwaits, ShortwaitsSchema } from "./entities/shortwaits.entity";
import { ShortwaitsController } from "./shortwaits.controller";
import { ShortwaitsService } from "./shortwaits.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shortwaits.name, schema: ShortwaitsSchema },
      { name: Business.name, schema: BusinessSchema },
      { name: Client.name, schema: ClientUserSchema },
    ]),
  ],
  controllers: [ShortwaitsController],
  providers: [ShortwaitsService],
})
export class ShortwaitsModule {}
