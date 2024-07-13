import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventDtoType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { BusinessUser } from "../../business-staff/entities/business-staff.entity";
import { Business } from "../../business/entities/business.entity";
import { Client } from "../../clients/entities/client.entity";
import { LocalClientUser } from "../../local-clients/entities/local-client-user.entity";
import { Service } from "../../services/entities/service.entity";
import { Event } from "../entities/event.entity";

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
    private localClientUserModel: Model<LocalClientUser>
  ) {}

  async getServiceById(serviceId: string) {
    try {
      const serviceRecord = await this.servicesModel.findOne({ _id: serviceId, deleted: false }).exec();

      if (!serviceRecord) {
        throw new UnauthorizedException("Service not found");
      }

      const isPrivate = serviceRecord.isPrivate;

      if (isPrivate) {
        return {
          message: "Service is private",
        };
      }

      return serviceRecord;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to retrieve service");
    }
  }

  async getBusinessRecord(businessId: string) {
    try {
      const businessRecord = await this.businessModel.findOne({ _id: businessId, deleted: false }).exec();

      if (!businessRecord) {
        throw new UnauthorizedException("Business not found");
      }

      return businessRecord;
    } catch (error) {
      console.error("getBusinessRecord >>>", error);
      throw new InternalServerErrorException("Failed to retrieve business");
    }
  }

  async getAllActiveServicesByBusinessId(businessId: string) {
    try {
      const businessRecord = await this.getBusinessRecord(businessId);
      const services = await this.servicesModel.find({ businessId: businessRecord._id, deleted: false }).exec();

      return services;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to retrieve active services");
    }
  }

  async getServicesByBusinessId(businessId: string) {
    try {
      const activeServices = await this.getAllActiveServicesByBusinessId(businessId);
      return activeServices;
    } catch (error) {
      console.error("getServicesByBusinessId >>>", error);
      throw new InternalServerErrorException("Failed to retrieve services");
    }
  }

  async createEventByClient(clientId: string, event: EventDtoType) {
    try {
      const clientRecord = await this.clientUserModel.findOne({ _id: clientId, deleted: false }).exec();

      if (!clientRecord) {
        throw new UnauthorizedException("Client not found");
      }

      const newEvent = new this.eventsModel({
        ...event,
        createdBy: clientId,
        updatedBy: clientId,
        deleted: false,
        canceled: false,
        isPublicEvent: true, // will always be public since it's created by client
        status: "active",
      });

      const savedEvent = await newEvent.save();

      return savedEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  async registerClientToEvent(clientId: string, eventId: string) {
    try {
      const eventRecord = await this.eventsModel.findOne({ _id: eventId, deleted: false }).exec();

      if (!eventRecord) {
        throw new NotFoundException("Event not found");
      }

      const clientRecord = await this.clientUserModel.findOne({ _id: clientId, deleted: false }).exec();
      const isClientAlreadyRegistered = eventRecord.clientsIds.includes(clientRecord._id);

      if (!clientRecord) {
        throw new NotFoundException("Client not found");
      }

      if (isClientAlreadyRegistered) {
        return await this.eventsModel.find({ clientsIds: { $in: [clientRecord._id] }, deleted: false }).exec();
      }

      eventRecord.clientsIds.push(clientRecord._id);

      await eventRecord.save();

      const updatedClientEvents = await this.eventsModel.find({ clientsIds: { $in: [clientRecord._id] }, deleted: false }).exec();

      return updatedClientEvents;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to register client to event");
    }
  }

  async updateEventByClient(eventId: string, updatedBy: string, event: EventDtoType) {
    try {
      const updatedEvent = await this.eventsModel.findOneAndUpdate({ _id: eventId, deleted: false }, { ...event, updatedBy }, { new: true });

      if (!updatedEvent) {
        throw new NotFoundException("Event not found");
      }

      return updatedEvent;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to update event");
    }
  }

  async getEventByShortEventId(shortEventId: string) {
    try {
      console.log(shortEventId);
      if (!shortEventId) {
        throw new NotFoundException("Event not found");
      }
      const event = await this.eventsModel.findOne({ shortId: shortEventId }).exec();
      console.log(JSON.stringify(event, null, 2));
      if (!event) {
        throw new NotFoundException("Event not found");
      }

      return event;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to get event");
    }
  }

  async getEventsByClientId(clientId: string, paginateOptions?: { page?: number; limit?: number }, filterOptions?: { date: string; filterBy: "day" | "month" | "year" }) {
    try {
      const { page, limit } = paginateOptions ?? {};
      const skip = (page - 1) * limit;

      const { date, filterBy } = filterOptions ?? {};
      const _date = new Date(date);

      const clientRecord = await this.clientUserModel.findOne({ _id: clientId, deleted: false }).exec();

      if (!clientRecord) {
        throw new UnauthorizedException("Client not found");
      }

      const filter: {
        clientsIds: { $in: string[] };
        deleted: boolean;
        startTime?: { $gte: Date; $lte: Date };
      } = {
        clientsIds: { $in: [clientRecord._id] },
        deleted: false,
      };

      // if (_date && filterBy === "day") {
      //   console.log({
      //     $gte: _date,
      //     $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
      //   });
      //   filter.startTime = {
      //     $gte: _date,
      //     $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
      //   };
      // } else if (_date && filterBy === "month") {
      //   const startDate = new Date(_date.getFullYear(), _date.getMonth(), 1);
      //   const endDate = new Date(_date.getFullYear(), _date.getMonth() + 1, 0);
      //   filter.startTime = {
      //     $gte: startDate,
      //     $lte: endDate,
      //   };
      // } else if (_date && filterBy === "year") {
      //   const startDate = new Date(_date.getFullYear(), 0, 1);
      //   const endDate = new Date(_date.getFullYear(), 11, 31);
      //   filter.startTime = {
      //     $gte: startDate,
      //     $lte: endDate,
      //   };
      // }
      console.log(filter);
      const events = await this.eventsModel.find(filter).skip(skip).limit(limit).exec();
      console.log(events);
      return events;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }
}
