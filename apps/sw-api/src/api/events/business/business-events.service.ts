import { Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectModel as InjectSequelizeModel } from "@nestjs/sequelize";
import { EventDtoType, EventTransactionType, ObjectId as ObjectIdType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { FilterQuery, Model, ObjectId, Types, UpdateQuery } from "mongoose";
import { Op } from "sequelize";
import { convertStringIdToObjectId, getBusinessEventGraphData, getNewEventFromDto, getUpdatedEventFromDto } from "../../../utils";
import { Service } from "../../business-services/entities/business-service.entity";
import { BusinessUser } from "../../business-users/entities/business-user.entity";
import { Business } from "../../business/entities/business.entity";
import { Client } from "../../clients/entities/client.entity";
import { EventTransactionModel } from "../../event-transactions/models/event-transaction.model";
import { LocalClient } from "../../local-clients/entities/local-client.entity";
import { Event } from "../entities/event.entity";
import { CreateEventsDto } from "./dto";

const currentDate = new Date();

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS_IN_A_DAY = 24;
const WEEK_DAYS_IN_A_WEEK = 7;
const DAYS_IN_A_MONTH = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
const MONTHS_IN_A_YEAR = 12;

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

  async createBusinessEvent(event: CreateEventsDto, userId: string) {
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

      const newEventPayload = getNewEventFromDto(event, userId);
      console.log("newEventPayload >>>", JSON.stringify(newEventPayload, null, 2));
      const newEvent = await this.eventsModel.create(newEventPayload);
      console.log("event created >>>", JSON.stringify(newEvent, null, 2));

      await businessRecord.updateOne({ $push: { events: newEvent._id } }).exec();

      const localClientRecordsToBeAdded: LocalClient[] = await this.findActiveLocalClients(newEvent.localClientsIds);
      const clientRecordsToBeAdded: Client[] = await this.findActiveClients(newEvent.clientsIds);
      await this.bulkCreateEventTransactions(localClientRecordsToBeAdded, clientRecordsToBeAdded, newEvent);

      return newEvent;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  async updateBusinessEvent(event: EventDtoType, businessId: string, updatedBy: string) {
    try {
      const updatedBusinessEvent = getUpdatedEventFromDto(event, updatedBy);
      const updatedEvent = await this.eventsModel.findOneAndUpdate({ _id: event._id, deleted: false }, updatedBusinessEvent, { new: true });

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

      // todo check if the user is allowed to view this event
      // const allowedBusinessUsers = [...new Set([...event.staffIds.map(id => id?.toString())])];

      // if (!allowedBusinessUsers.includes(requestedBy)) {
      //   throw new ForbiddenException("You are not allowed to view this event");
      // }

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

  async updateClientsInBusinessEvent(eventId: string, localClientIds: string[], clientIds: string[]) {
    try {
      const eventRecord = await this.eventsModel.findOne({ _id: eventId, deleted: false });
      if (!eventRecord) {
        throw new PreconditionFailedException("Invalid parameters");
      }
      const existingLocalClientIds = eventRecord.localClientsIds?.map(id => id.toString()) ?? [];
      const existingClientIds = eventRecord.clientsIds?.map(id => id.toString()) ?? [];

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

      const localClientRecordsToBeAdded: LocalClient[] = await this.findActiveLocalClients(localClientsToBeAdded);
      const clientRecordsToBeAdded: Client[] = await this.findActiveClients(clientsToBeAdded);
      const localClientRecordsToBeRemoved: LocalClient[] = await this.findActiveLocalClients(localClientsToBeRemoved);
      const clientRecordsToBeRemoved: Client[] = await this.findActiveClients(clientsToBeRemoved);

      const eventsFilterQuery: FilterQuery<Event> = { _id: eventId, deleted: false };
      const clientRecordIdsToBeRemoved: ObjectId[] = clientRecordsToBeRemoved.map(record => record._id as ObjectId);
      const localClientRecordIdsToBeRemoved: ObjectId[] = localClientRecordsToBeRemoved.map(record => record._id as ObjectId);
      const clientRecordIdStringsToBeRemoved: string[] = clientRecordIdsToBeRemoved.map(_id => _id.toString());
      const localClientRecordIdStringToBeRemoved: string[] = localClientRecordIdsToBeRemoved.map(_id => _id.toString());
      const hasClientRecordIdStringsToBeRemoved = !isEmpty(clientRecordIdStringsToBeRemoved);
      const hasLocalClientRecordIdStringToBeRemoved = !isEmpty(localClientRecordIdStringToBeRemoved);
      const hasRecordsToBeRemoved = hasClientRecordIdStringsToBeRemoved || hasLocalClientRecordIdStringToBeRemoved;

      if (hasRecordsToBeRemoved) {
        const eventsToBeRemovedModelQuery: UpdateQuery<Event> = {
          $pull: {
            ...(hasLocalClientRecordIdStringToBeRemoved ? { localClientsIds: { $in: localClientRecordIdsToBeRemoved } } : {}),
            ...(hasRecordsToBeRemoved ? { clientsIds: { $in: clientRecordIdStringsToBeRemoved } } : {}),
          },
        };
        console.log("eventsToBeRemovedModelQuery >>>", JSON.stringify(eventsToBeRemovedModelQuery, null, 2));
        await this.eventsModel.findOneAndUpdate(eventsFilterQuery, eventsToBeRemovedModelQuery);

        const updatedTransactions = await this.eventTransactionModel.update(
          { withdraw_from_event: true },
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

      await this.bulkCreateEventTransactions(localClientRecordsToBeAdded, clientRecordsToBeAdded, updatedEvent);

      return updatedEvent;
    } catch (error) {
      console.log("updateClientsInBusinessEvent error >>>", error);
      throw error;
    }
  }

  async getBusinessEventSummary(businessId: string) {
    try {
      const eventFilter = {
        businessId: convertStringIdToObjectId(businessId),
        // check if the event was created within a year
        createdAt: {
          $gte: new Date(currentDate.getFullYear(), 0, 1),
          $lte: new Date(currentDate.getFullYear(), 11, 31),
        },
      };
      const events = await this.eventsModel.find(eventFilter).exec();

      const { yearMonthly, monthDaily, weekDaily, yesterdayHourly, todayHourly } = getBusinessEventGraphData(events);

      const graphData = {
        Today: todayHourly,
        Yesterday: yesterdayHourly,
        Week: weekDaily,
        Month: monthDaily,
        Year: yearMonthly,
      };

      const listData = events; // todo: add transaction format

      return {
        requestDate: currentDate,
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

      const businessIdObject = new Types.ObjectId(businessId);

      const filter: {
        businessId: Types.ObjectId;
        deleted: boolean;
        startTime?: { $gte: Date; $lte: Date };
      } = {
        businessId: businessIdObject,
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
      // todo: add pagination and filter by date and filterBy and limit
      const events = await this.eventsModel
        .find({
          businessId: businessIdObject,
          deleted: false,
        })
        .exec();
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

  async bulkCreateEventTransactions(localClient: LocalClient[], client: Client[], event: Event) {
    if (isEmpty(localClient) && isEmpty(client)) {
      return;
    }

    try {
      const eventRecordId = event._id.toString();
      const newEventTransactionPayload: EventTransactionType[] = [
        ...localClient.map(record => ({
          event_id: eventRecordId,
          client_id: null,
          local_client_id: record._id.toString(),
          transaction_date: new Date(),
          transaction_amount: event?.payment?.amount || 0,
          transaction_type: event.paymentMethod || null,
          payment_method: event.paymentMethod || null,
          transaction_status: event.status.statusName,
          notes: null,
          promo_codes: null,
          withdraw_from_event: false,
        })),
        ...client.map(record => ({
          event_id: eventRecordId,
          client_id: record._id.toString(),
          local_client_id: null,
          transaction_date: new Date(),
          transaction_amount: event?.payment?.amount || 0,
          transaction_type: event.paymentMethod || null,
          payment_method: event.paymentMethod || null,
          transaction_status: event.status.statusName,
          notes: null,
          promo_codes: null,
          withdraw_from_event: false,
        })),
      ];
      console.log("newEventTransactionPayload >>>", newEventTransactionPayload);
      const newTransactions = await this.eventTransactionModel.bulkCreate(newEventTransactionPayload);
      console.log("new transactions >>>", newTransactions);
    } catch (error) {
      console.log("bulkCreateEventTransactions error >>>", error);
      throw error;
    }
  }

  async findActiveLocalClients(localClientIds: (ObjectIdType | string)[]) {
    if (!localClientIds || !localClientIds.length) {
      return [];
    }

    try {
      const localClients = await this.localClientUserModel.find({ _id: { $in: localClientIds }, deleted: false }).exec();
      return localClients;
    } catch (error) {
      throw new PreconditionFailedException("no records found for local clients to be added");
    }
  }

  async findActiveClients(clientIds: (ObjectIdType | string)[]) {
    if (!clientIds || !clientIds.length) {
      return [];
    }

    try {
      const localClients = await this.clientUserModel.find({ _id: { $in: clientIds }, deleted: false }).exec();
      return localClients;
    } catch (error) {
      throw new PreconditionFailedException("no records found for clients to be added");
    }
  }
}
