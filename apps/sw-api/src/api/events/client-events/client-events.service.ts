import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventDtoType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { BusinessUser } from "../../business-staff/entities/business-staff.entity";
import { Business } from "../../business/entities/business.entity";
import { ClientUser } from "../../client-user/entities/client-user.entity";
import { LocalClientUser } from "../../local-client-user/entities/local-client-user.entity";
import { Service } from "../../services/entities/service.entity";
import { Events } from "../entities/events.entity";

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(BusinessUser.name) private businessUserModel: Model<BusinessUser>,
    @InjectModel(ClientUser.name) private clientUserModel: Model<ClientUser>,
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

  async getServicesByBusinessId(businessId: string) {
    try {
      const businessRecord = await this.businessModel.findOne({ _id: businessId, deleted: false }).exec();

      if (!businessRecord) {
        throw new UnauthorizedException("Business not found");
      }

      const services = await this.servicesModel.find({ businessId, deleted: false }).exec();

      if (services.length === 0) {
        return {
          message: "No services found",
        };
      }
      return services;
    } catch (error) {
      console.error(error);
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

      const filter: {
        clientsIds: { $in: string[] };
        deleted: boolean;
        startTime?: { $gte: Date; $lte: Date };
      } = {
        clientsIds: { $in: [clientId] },
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
}
