import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectModel as InjectSequelizeModel } from "@nestjs/sequelize";
import { EventDtoType, EventTransactionType } from "@shortwaits/shared-lib";
import { Model, ObjectId, Types } from "mongoose";
import { generateNewEvent } from "../../../utils/filtersForDtos";
import { BusinessUser } from "../../business-staff/entities/business-staff.entity";
import { Business } from "../../business/entities/business.entity";
import { Client } from "../../clients/entities/client.entity";
import { EventTransactionModel } from "../../event-transactions/models/event-transaction.model";
import { LocalClientUser } from "../../local-clients/entities/local-client-user.entity";
import { Service } from "../../services/entities/service.entity";
import { Event } from "../entities/event.entity";
import { CreateEventsDto } from "./dto";

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventsModel: Model<Event>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(BusinessUser.name) private businessUserModel: Model<BusinessUser>,
    @InjectModel(Client.name) private clientUserModel: Model<Client>,
    @InjectModel(LocalClientUser.name)
    private localClientUserModel: Model<LocalClientUser>,
    @InjectSequelizeModel(EventTransactionModel) private eventTransactionModel: typeof EventTransactionModel
  ) {}

  async createEvent(event: CreateEventsDto, userId: string): Promise<Event & { _id: Types.ObjectId }> {
    try {
      const businessRecord = await this.businessModel.findById(event.businessId);

      if (!businessRecord) {
        throw new UnauthorizedException("Business not found");
      }

      const isAdmin = businessRecord.admins.some(adminId => adminId.toString() === userId);

      if (!isAdmin) {
        throw new UnauthorizedException("User not found");
      }

      const isTaxable = false; // todo check later if events can be taxable

      if (isTaxable) {
        // do something
      }

      const filteredNewEvent = generateNewEvent(event, userId);
      console.log("New Event >>>", JSON.stringify(filteredNewEvent, null, 2));
      const newEvent = await this.eventsModel.create(filteredNewEvent);
      await businessRecord.updateOne({ $push: { events: newEvent._id } }).exec();

      return newEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  async updateEvent(event: EventDtoType, businessId: string, updatedBy: string) {
    try {
      const updatedEvent = await this.eventsModel.findOneAndUpdate({ _id: event._id, deleted: false }, { ...event, updatedBy }, { new: true });

      if (!updatedEvent) {
        throw new NotFoundException("Event not found");
      }

      return updatedEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to update event");
    }
  }

  async registerClientsToEvent(clientIds: string[], eventId: string) {
    try {
      const eventRecord = await this.eventsModel.findOne({ _id: eventId, deleted: false });
      const clientRecords = await this.clientUserModel.find({ _id: { $in: clientIds }, deleted: false });

      if (!eventRecord || clientRecords.length === 0) {
        throw new PreconditionFailedException("Invalid parameters");
      }

      const updatedEvent = await this.eventsModel.findOneAndUpdate(
        { _id: eventId, deleted: false },
        { $push: { localClientsIds: { $each: clientRecords.map(record => record._id) } } },
        { new: true }
      );

      const eventTransactionPayload: EventTransactionType[] = clientRecords.map(record => ({
        event_id: eventRecord._id.toString(),
        client_id: record._id,
        local_client_id: null,
        transaction_date: new Date(),
        transaction_amount: eventRecord.payment.amount || 0,
        transaction_type: eventRecord.paymentMethod || null,
        payment_method: eventRecord.paymentMethod || null,
        transaction_status: eventRecord.status.statusName,
        notes: null,
        promo_codes: null,
      }));

      const transactions = await this.eventTransactionModel.bulkCreate(eventTransactionPayload);

      return { updatedEvent, transactions };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to register client to event");
    }
  }

  async registerLocalClientsToEvent(localClientIds: string[], eventId: string) {
    try {
      const eventRecord = await this.eventsModel.findOne({ _id: eventId, deleted: false });
      const localClientRecords = await this.localClientUserModel.find({ _id: { $in: localClientIds }, deleted: false });

      if (!eventRecord || localClientRecords.length === 0) {
        throw new PreconditionFailedException("Invalid parameters");
      }

      const updatedEvent = await this.eventsModel.findOneAndUpdate(
        { _id: eventId, deleted: false },
        { $push: { localClientsIds: { $each: localClientRecords.map(record => record._id) } } },
        { new: true }
      );

      const eventTransactionPayload: EventTransactionType[] = localClientRecords.map(record => ({
        event_id: eventRecord._id.toString(),
        client_id: null,
        local_client_id: record._id,
        transaction_date: new Date(),
        transaction_amount: eventRecord.payment.amount || 0,
        transaction_type: eventRecord.paymentMethod || null,
        payment_method: eventRecord.paymentMethod || null,
        transaction_status: eventRecord.status.statusName,
        notes: null,
        promo_codes: null,
      }));

      const transactions = await this.eventTransactionModel.bulkCreate(eventTransactionPayload);

      return { updatedEvent, transactions };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to register local client to event");
    }
  }

  async getEventsSummaryByBusiness(businessId: string) {
    try {
      const filter: {
        businessId: string;
      } = { businessId };

      const events = await this.eventsModel.find(filter).exec();

      const totalAmountPerDayHour = {};
      const totalAmountPerWeekDay = {
        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
      };
      const totalAmountPerMonthDay = {};
      const totalAmountPerYearMonth = {};

      for (let hour = 0; hour < 24; hour++) {
        totalAmountPerDayHour[hour] = 0;
      }
      for (let month = 0; month < 12; month++) {
        totalAmountPerYearMonth[month + 1] = 0;
      }
      events.forEach(item => {
        if (item.payment?.paymentProcessedOn) {
          const date = new Date(item.payment.paymentProcessedOn);

          const today = new Date(Date.now());
          const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

          for (let day = 1; day <= daysInCurrentMonth; day++) {
            totalAmountPerMonthDay[day] = 0;
          }

          if (date.getDate() === today.getDate()) {
            const dayHourKey = date.getHours();
            totalAmountPerDayHour[dayHourKey] += item.payment.amount || 0;
          }

          // Subtract 7 from the start and end to get the dates for last week
          const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6 - 7);

          if (
            date.getFullYear() >= lastWeekStart.getFullYear() &&
            date.getMonth() >= lastWeekStart.getMonth() &&
            date.getDate() >= lastWeekStart.getDate() &&
            date.getFullYear() <= lastWeekEnd.getFullYear() &&
            date.getMonth() <= lastWeekEnd.getMonth() &&
            date.getDate() <= lastWeekEnd.getDate()
          ) {
            const weekDayKey = date.getDay();
            const weekDayFullName = WEEK_DAY[weekDayKey];

            totalAmountPerWeekDay[weekDayFullName] += item.payment.amount || 0;
          }
          if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
            const monthDayKey = date.getDate();

            totalAmountPerMonthDay[monthDayKey] += item.payment.amount || 0;
          }

          if (date.getFullYear() === today.getFullYear()) {
            const monthKey = date.getMonth() + 1;
            totalAmountPerYearMonth[monthKey] += item.payment.amount || 0;
          }
        }
      });

      const graphData = {
        Yesterday: totalAmountPerDayHour,
        Week: totalAmountPerWeekDay,
        Month: totalAmountPerMonthDay,
        Year: totalAmountPerYearMonth,
      };

      const listData = events; // todo: add transaction format

      return {
        graphData,
        listData: events,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }

  async getEventsByBusiness(businessId: string, paginateOptions?: { page?: number; limit?: number }, filterOptions?: { date: string; filterBy: "day" | "month" | "year" }) {
    try {
      const { page, limit } = paginateOptions ?? {};
      const skip = (page - 1) * limit;

      const { date, filterBy } = filterOptions ?? {};
      const _date = new Date(date);

      const filter: {
        businessId: string;
        deleted: boolean;
        startTime?: { $gte: Date; $lte: Date };
      } = {
        businessId,
        deleted: false,
      };

      if (_date && filterBy === "day") {
        console.log({
          $gte: _date,
          $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
        });
        filter.startTime = {
          $gte: _date,
          $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
        };
      } else if (_date && filterBy === "month") {
        const startDate = new Date(_date.getFullYear(), _date.getMonth(), 1);
        const endDate = new Date(_date.getFullYear(), _date.getMonth() + 1, 0);
        filter.startTime = {
          $gte: startDate,
          $lte: endDate,
        };
      } else if (_date && filterBy === "year") {
        const startDate = new Date(_date.getFullYear(), 0, 1);
        const endDate = new Date(_date.getFullYear(), 11, 31);
        filter.startTime = {
          $gte: startDate,
          $lte: endDate,
        };
      }
      const events = await this.eventsModel.find(filter).skip(skip).limit(limit).exec();
      return events;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }

  // todo: allow business admin to have visibility to all events people
  async getPeopleByEvent(eventId: string, requestedBy: string) {
    try {
      const filter = { _id: eventId };

      const event = await this.eventsModel.findOne(filter).exec();

      if (!event) {
        throw new NotFoundException("Event not found");
      }

      // check if event.clientIds or event.staffIds is not empty and is a valid array else return empty arrays
      if ((!event.clientsIds || !event.clientsIds.length) && (!event.staffIds || !event.staffIds.length) && (!event.localClientsIds || !event.localClientsIds.length)) {
        return { clientUsers: [], businessUsers: [], localClients: [], event };
      }
      // turn all ids to string and push only unique ids - only staffIds/business are allowed to view this event
      const eligibleUsers = [...new Set([...event.staffIds.map(id => id?.toString())])];

      if (!eligibleUsers.includes(requestedBy)) {
        throw new ForbiddenException("You are not allowed to view this event");
      }

      console.log("clientIds >>>", event.clientsIds);
      console.log("localClientsIds >>>", event.localClientsIds);
      console.log("businessUsersIds >>>", event.staffIds);

      const [clientUsers, localClients, businessUsers] = await Promise.all([
        this.findClientUsers(event?.clientsIds as ObjectId[]),
        this.findLocalClientUsers(event?.localClientsIds as ObjectId[]),
        this.findBusinessUsers(event?.staffIds as ObjectId[]),
      ]);

      console.log("clientUsers found >>>", clientUsers);
      console.log("localClients found >>>", localClients);
      console.log("businessUsers found >>>", businessUsers);

      return { clientUsers, localClients, businessUsers, event };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // HELPER FUNCTIONS
  async findLocalClientUsers(userIds: string[] | ObjectId[]) {
    if (!userIds || !userIds.length) {
      return [];
    }
    try {
      const localClients = await this.localClientUserModel.find({ _id: { $in: userIds } }).exec();
      return localClients;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findClientUsers(userIds: string[] | ObjectId[]) {
    if (!userIds || !userIds.length) {
      return [];
    }
    try {
      const clientUsers = await this.clientUserModel.find({ _id: { $in: userIds } }).exec();
      return clientUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findBusinessUsers(userIds: string[] | ObjectId[]) {
    if (!userIds || !userIds.length) {
      return [];
    }
    try {
      const clientUsers = await this.businessUserModel.find({ _id: { $in: userIds } }).exec();
      return clientUsers;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
