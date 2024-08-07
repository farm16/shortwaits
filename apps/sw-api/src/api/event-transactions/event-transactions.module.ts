import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { EventTransactionsController } from "./event-transactions.controller";
import { EventTransactionsService } from "./event-transactions.service";
import { EventTransactionModel } from "./models/event-transaction.model";

@Module({
  imports: [
    SequelizeModule.forFeature([EventTransactionModel]),
    MongooseModule.forFeature([
      {
        name: Business.name,
        schema: BusinessSchema,
      },
    ]),
  ],
  controllers: [EventTransactionsController],
  providers: [EventTransactionsService],
})
export class EventTransactionsModule {}
