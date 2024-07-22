import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectModel as InjectSequelizeModel } from "@nestjs/sequelize";
import { Model } from "mongoose";
import { print } from "../../utils";
import { Business } from "../business/entities/business.entity";
import { EventTransactionModel } from "./models/event-transaction.model";

@Injectable()
export class EventTransactionsService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectSequelizeModel(EventTransactionModel) private eventTransactionModel: typeof EventTransactionModel
  ) {}

  async getEventTransactionsForBusiness(businessId: string) {
    print({ module: "EventTransactionsService", message: "businessId", value: businessId });
    const business = await this.businessModel.findById(businessId);
    print({ module: "EventTransactionsService", message: "business", value: business });

    if (!business) {
      throw new NotFoundException("Business not found");
    }

    const events = business.events;
    print({ module: "EventTransactionsService", message: "events", value: events });

    if (!events || events.length === 0) {
      throw new NotFoundException("No events found for business");
    }

    const eventStringIds = events.map(_id => _id.toString());

    // query for each event in eventStringIds array
    const eventTransactions = await this.eventTransactionModel.findAll({
      where: {
        event_id: eventStringIds,
      },
    });

    print({ module: "EventTransactionsService", message: "eventTransactions", value: eventTransactions });

    return eventTransactions;
  }
}
