import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectModel as InjectSequelizeModel } from "@nestjs/sequelize";
import { EventDtoType, EventTransactionType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { FilterQuery, Model, ObjectId, Types, UpdateQuery } from "mongoose";
import { Op } from "sequelize";
import { generateNewEvent } from "../../../utils/filtersForDtos";
import { Service } from "../../business-services/entities/business-service.entity";
import { BusinessUser } from "../../business-users/entities/business-user.entity";
import { Business } from "../../business/entities/business.entity";
import { Client } from "../../clients/entities/client.entity";
import { EventTransactionModel } from "../../event-transactions/models/event-transaction.model";
import { LocalClient } from "../../local-clients/entities/local-client.entity";
import { Event } from "../entities/event.entity";
import { CreateEventsDto } from "./dto";

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

@Injectable()
export class BusinessEventsService {
  constructor(
    @InjectModel(Event.name) private eventsModel: Model<Event>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(BusinessUser.name) private businessUserModel: Model<BusinessUser>,
    @InjectModel(Client.name) private clientUserModel: Model<Client>,
    @InjectModel(LocalClient.name)
    private localClientUserModel: Model<LocalClient>,
    @InjectSequelizeModel(EventTransactionModel) private eventTransactionModel: typeof EventTransactionModel
  ) {}

  async createBusinessEvent(event: CreateEventsDto, userId: string): Promise<Event & { _id: Types.ObjectId }> {
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
      console.log(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  async updateBusinessEvent(event: EventDtoType, businessId: string, updatedBy: string) {
    try {
      const updatedEvent = await this.eventsModel.findOneAndUpdate({ _id: event._id, deleted: false }, { ...event, updatedBy }, { new: true });

      if (!updatedEvent) {
        throw new NotFoundException("Event not found");
      }

      return updatedEvent;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Failed to update event");
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
      console.log(error);
      throw error;
    }
  }

  async registerMultipleToEvent(eventId: string, localClientIds: string[], clientIds: string[]) {
    try {
      if (isEmpty(localClientIds) && isEmpty(clientIds)) {
        throw new PreconditionFailedException("no clients provided");
      }

      const eventRecord = await this.eventsModel.findOne({ _id: eventId, deleted: false });
      if (!eventRecord) {
        throw new PreconditionFailedException("Invalid parameters");
      }
      const existingLocalClientIds = eventRecord.localClientsIds.map(id => id.toString());
      const existingClientIds = eventRecord.clientsIds.map(id => id.toString());

      // if localClientIds doesn't contain any existing local client ids remove them from the event
      const localClientsToBeRemoved = existingLocalClientIds.filter(id => !localClientIds.includes(id));
      const clientsToBeRemoved = existingClientIds.filter(id => !clientIds.includes(id));

      const localClientsToBeAdded = localClientIds.reduce<string[]>((acc, id) => {
        if (!existingLocalClientIds.includes(id)) {
          acc.push(id);
        }
        return acc;
      }, []);
      const clientsToBeAdded = clientIds.reduce<string[]>((acc, id) => {
        if (!existingClientIds.includes(id)) {
          acc.push(id);
        }
        return acc;
      }, []);

      const hasLocalClientsToBeRemoved = !isEmpty(localClientsToBeRemoved);
      const hasClientsToBeRemoved = !isEmpty(clientsToBeRemoved);
      const hasLocalClientsToBeAdded = !isEmpty(localClientsToBeAdded);
      const hasClientsToBeAdded = !isEmpty(clientsToBeAdded);

      console.log("localClientsToBeRemoved >>>", localClientsToBeRemoved);
      console.log("clientsToBeRemoved >>>", clientsToBeRemoved);
      console.log("localClientsToBeAdded >>>", localClientsToBeAdded);
      console.log("clientsToBeAdded >>>", clientsToBeAdded);

      if (!hasLocalClientsToBeRemoved && !hasClientsToBeRemoved && !hasLocalClientsToBeAdded && !hasClientsToBeAdded) {
        throw new PreconditionFailedException("Nothing to update");
      }

      let localClientRecordsToBeAdded: LocalClient[] = [];
      let clientRecordsToBeAdded: Client[] = [];
      let localClientRecordsToBeRemoved: LocalClient[] = [];
      let clientRecordsToBeRemoved: Client[] = [];

      if (hasLocalClientsToBeAdded) {
        localClientRecordsToBeAdded = await this.localClientUserModel.find({ _id: { $in: localClientsToBeAdded }, deleted: false });
        if (isEmpty(localClientRecordsToBeAdded)) {
          throw new PreconditionFailedException("no records found for local clients to be added");
        }
      }

      if (hasClientsToBeAdded) {
        clientRecordsToBeAdded = await this.clientUserModel.find({ _id: { $in: clientsToBeAdded }, deleted: false });
        if (isEmpty(clientRecordsToBeAdded)) {
          throw new PreconditionFailedException("no records found for clients to be added");
        }
      }

      if (hasLocalClientsToBeRemoved) {
        localClientRecordsToBeRemoved = await this.localClientUserModel.find({ _id: { $in: localClientsToBeRemoved }, deleted: false });
        if (isEmpty(localClientRecordsToBeRemoved)) {
          throw new PreconditionFailedException("no records found for local clients to be removed");
        }
      }

      if (hasClientsToBeRemoved) {
        clientRecordsToBeRemoved = await this.clientUserModel.find({ _id: { $in: clientsToBeRemoved }, deleted: false });
        if (isEmpty(clientRecordsToBeRemoved)) {
          throw new PreconditionFailedException("no records found for clients to be removed");
        }
      }

      const eventsFilterQuery: FilterQuery<Event> = { _id: eventId, deleted: false };
      const clientRecordIdStringsToBeRemoved: string[] = clientRecordsToBeRemoved.map(record => record._id.toString());
      const localClientRecordIdStringToBeRemoved: string[] = localClientRecordsToBeRemoved.map(record => record._id.toString());
      const hasClientRecordIdStringsToBeRemoved = !isEmpty(clientRecordIdStringsToBeRemoved);
      const hasLocalClientRecordIdStringToBeRemoved = !isEmpty(localClientRecordIdStringToBeRemoved);
      const hasRecordsToBeRemoved = hasClientRecordIdStringsToBeRemoved || hasLocalClientRecordIdStringToBeRemoved;

      if (hasRecordsToBeRemoved) {
        const eventsToBeRemovedModelQuery: UpdateQuery<Event> = {
          $pull: {
            ...(hasLocalClientRecordIdStringToBeRemoved ? { localClientsIds: { $in: localClientRecordIdStringToBeRemoved } } : {}),
            ...(hasRecordsToBeRemoved ? { clientsIds: { $in: clientRecordIdStringsToBeRemoved } } : {}),
          },
        };
        console.log("eventsToBeRemovedModelQuery >>>", JSON.stringify(eventsToBeRemovedModelQuery, null, 2));
        await this.eventsModel.findOneAndUpdate(eventsFilterQuery, eventsToBeRemovedModelQuery);

        const updatedTransactions = await this.eventTransactionModel.update(
          { withdraw_from_event: false },
          {
            where: {
              event_id: eventId,
              [Op.or]: [{ client_id: { [Op.in]: clientRecordIdStringsToBeRemoved } }, { local_client_id: { [Op.in]: localClientRecordIdStringToBeRemoved } }],
            },
          }
        );
        console.log("updated transactions: { withdraw_from_event: false } >>>", updatedTransactions);
      }

      const eventsModelQuery: UpdateQuery<Event> = {
        $push: {
          ...(isEmpty(localClientRecordsToBeAdded) ? {} : { localClientsIds: { $each: localClientRecordsToBeAdded.map(record => record._id) } }),
          ...(isEmpty(clientRecordsToBeAdded) ? {} : { clientsIds: { $each: clientRecordsToBeAdded.map(record => record._id) } }),
        },
      };

      const updatedEvent = await this.eventsModel.findOneAndUpdate(eventsFilterQuery, eventsModelQuery, { new: true });
      console.log("updatedEvent >>>", updatedEvent);

      const eventRecordId = updatedEvent._id.toString();
      const newEventTransactionPayload: EventTransactionType[] = [
        ...localClientRecordsToBeAdded.map(record => ({
          event_id: eventRecordId,
          client_id: null,
          local_client_id: record._id.toString(),
          transaction_date: new Date(),
          transaction_amount: eventRecord?.payment?.amount || 0,
          transaction_type: eventRecord.paymentMethod || null,
          payment_method: eventRecord.paymentMethod || null,
          transaction_status: eventRecord.status.statusName,
          notes: null,
          promo_codes: null,
          withdraw_from_event: false,
        })),
        ...clientRecordsToBeAdded.map(record => ({
          event_id: eventRecordId,
          client_id: record._id.toString(),
          local_client_id: null,
          transaction_date: new Date(),
          transaction_amount: eventRecord?.payment?.amount || 0,
          transaction_type: eventRecord.paymentMethod || null,
          payment_method: eventRecord.paymentMethod || null,
          transaction_status: eventRecord.status.statusName,
          notes: null,
          promo_codes: null,
          withdraw_from_event: false,
        })),
      ];
      console.log("newEventTransactionPayload >>>", newEventTransactionPayload);
      const newTransactions = await this.eventTransactionModel.bulkCreate(newEventTransactionPayload);
      console.log("new transactions >>>", newTransactions);

      return updatedEvent;
    } catch (error) {
      console.log("registerMultipleToEvent error >>>", error);
      throw error;
    }
  }

  async getBusinessEventSummary(businessId: string) {
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
      console.log(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }

  async getBusinessEvents(businessId: string, paginateOptions?: { page?: number; limit?: number }, filterOptions?: { date: string; filterBy: "day" | "month" | "year" }) {
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
      console.log(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }

  // ======= HELPER FUNCTIONS =======
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
