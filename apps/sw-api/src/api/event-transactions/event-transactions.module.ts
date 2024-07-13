import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventTransactionModel } from "./models/event-transaction.model";

@Module({
  imports: [SequelizeModule.forFeature([EventTransactionModel])],
  controllers: [],
  providers: [],
})
export class EventTransactionsModule {}
