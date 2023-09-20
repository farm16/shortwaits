import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";

import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { BusinessUser } from "../business-user/entities/business-user.entity";
import { Events } from "./entities/events.entity";
import { CreateEventsDto } from "./dto/create-event.dto";
import { convertArrayToObjectId } from "../../utils/converters";
import { EventDtoType } from "@shortwaits/shared-lib";
import { getFilteredNewEvent } from "../../utils/filtersForDtos";
import { ClientUser } from "../client-user/entities/client-user.entity";

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(BusinessUser.name) private businessUserModel: Model<BusinessUser>,
    @InjectModel(ClientUser.name) private clientUserModel: Model<ClientUser>
  ) {}

  async createEvent(event: CreateEventsDto, userId: string): Promise<Events & { _id: Types.ObjectId }> {
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

      const _newEvent = getFilteredNewEvent(event, userId);
      console.log("New Event >>>", JSON.stringify(_newEvent, null, 2));

      const newEvent = await this.eventsModel.create(_newEvent);

      await businessRecord.updateOne({ $push: { events: newEvent._id } }).exec();

      return newEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  async updateEvent(event: EventDtoType, businessId: string, updatedBy: string) {
    try {
      const updatedEvent = await this.eventsModel.findOneAndUpdate(
        { _id: event._id, deleted: false },
        { ...event, updatedBy },
        { new: true }
      );

      if (!updatedEvent) {
        throw new NotFoundException("Event not found");
      }

      return updatedEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to update event");
    }
  }

  async deleteEvent(eventId: string, deletedBy: string) {
    try {
      // Find and delete the event
      const deleteResult = await this.eventsModel
        .findOneAndUpdate(
          {
            _id: eventId,
            deleted: false,
          },
          {
            $set: {
              deleted: true,
              updatedBy: deletedBy,
            },
          },
          { new: true }
        )
        .exec();

      if (!deleteResult) {
        throw new NotFoundException("Event not found");
      }
      await this.businessModel.updateOne({ events: eventId }, { $pull: { events: eventId } }).exec();
      return deleteResult;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to delete event");
    }
  }

  async deleteEvents(eventIds: string[], deletedBy: string) {
    try {
      const _eventIds = convertArrayToObjectId(eventIds);
      console.log(_eventIds);
      const updatedEvents = await this.eventsModel
        .updateMany(
          {
            _id: { $in: _eventIds },
            deleted: false,
          },
          {
            $set: {
              deleted: true,
              updatedBy: deletedBy,
            },
          }
        )
        .exec();

      if (updatedEvents.modifiedCount === 0) {
        return {
          modifiedEventCount: updatedEvents.modifiedCount,
          modifiedBusinessCount: 0,
          modifiedClientCount: null, //pending
        };
      }
      const updatedBusiness = await this.businessModel
        .updateOne({ events: { $in: _eventIds } }, { $pullAll: { events: _eventIds } })
        .exec();

      return {
        modifiedCount: updatedEvents.modifiedCount,
        modifiedBusinessCount: updatedBusiness.modifiedCount,
        modifiedClientCount: null, //pending
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to delete events");
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

  async getEventsByBusiness(
    businessId: string,
    paginateOptions?: { page?: number; limit?: number },
    filterOptions?: { date: string; filterBy: "day" | "month" | "year" }
  ) {
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

  // todo: allow business admin to have visibility to all events people
  async getPeopleByEvent(eventId: string, requestedBy: string) {
    try {
      const filter = { _id: eventId };

      const event = await this.eventsModel.findOne(filter).exec();

      if (!event) {
        throw new NotFoundException("Event not found");
      }

      // check if event.clientIds or event.staffIds is not empty and is a valid array else return empty arrays
      if ((!event.clientsIds || !event.clientsIds.length) && (!event.staffIds || !event.staffIds.length)) {
        return { clientUsers: [], businessUsers: [] };
      }
      // turn all ids to string and push only unique ids
      const eligibleUsers = [
        ...new Set([...event.clientsIds.map(id => id?.toString()), ...event.staffIds.map(id => id?.toString())]),
      ];

      if (!eligibleUsers.includes(requestedBy)) {
        throw new ForbiddenException("You are not allowed to view this event");
      }

      const [clientUsers, businessUsers] = await Promise.all([
        this.findClientUsers(event?.clientsIds as ObjectId[]),
        this.findBusinessUsers(event?.staffIds as ObjectId[]),
      ]);

      return { clientUsers, businessUsers, event };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
