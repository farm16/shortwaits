import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventsDocType, ObjectId, UserDocType } from "@shortwaits/shared-types";
import { Model, Types } from "mongoose";

import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { BusinessUser } from "../business-user/entities/business-user.entity";
import { Events } from "./entities/events.entity";
import { CreateEventsDto } from "./dto/create-event.dto";
import { UpdateEventsDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>
  ) {}

  async createEvent(
    event: CreateEventsDto,
    userId: string
  ): Promise<Events & { _id: Types.ObjectId }> {
    try {
      const businessRecord = await this.businessModel.findById(
        event.businessId
      );

      if (!businessRecord) {
        throw new UnauthorizedException("Business not found");
      }

      const isAdmin = businessRecord.admins.some(
        adminId => adminId.toString() === userId
      );

      if (!isAdmin) {
        throw new UnauthorizedException("User not found");
      }

      const isTaxable = false; // todo check later if events can be taxable
      const status = { statusCode: 0, statusName: "PENDING" };
      const createdBy = userId;
      const updatedBy = userId;
      const isGroupEvent = event.clientsIds.length > 1;
      const deleted = false;
      const canceled = false;
      const _finalPrice = event.priceExpected;
      if (isTaxable) {
        // do something
      }

      const eventCreated = await this.eventsModel.create({
        participantsIds: event.participantsIds,
        staffIds: event.staffIds,
        clientsIds: event.clientsIds,
        businessId: event.businessId,
        createdBy,
        updatedBy,
        leadClientId: event.leadClientId,
        name: event.name,
        description: event.description,
        eventImage: event.eventImage,
        serviceId: event.serviceId,
        features: event.features,
        status,
        hasNoDuration: event.hasNoDuration,
        durationInMin: event.durationInMin,
        startTime: event.startTime,
        endTime: event.endTime,
        endTimeExpected: event.endTimeExpected,
        priceExpected: event.priceExpected,
        priceFinal: _finalPrice,
        canceled,
        isGroupEvent,
        repeat: event.repeat,
        payment: event.payment,
        notes: event.notes,
        labels: event.labels,
        urls: event.urls,
        deleted,
        location: event.location,
        attendeeLimit: event.attendeeLimit,
        registrationDeadline: event.registrationDeadline,
        registrationFee: event.registrationFee,
      });

      await businessRecord
        .updateOne({ $push: { events: eventCreated._id } })
        .exec();

      return eventCreated;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create event");
    }
  }

  /**
   *
   * this finds all events by business not by createdBy(userID)
   * so all events that relate to a business
   */
  async getEventsByBusiness(
    businessId: string,
    paginateOptions?: { page: number; limit: number },
    filterOptions?: { date?: Date; month?: number; year?: number }
  ): Promise<EventsDocType> {
    try {
      const { page = 1, limit = 10 } = paginateOptions ?? {};
      const skip = (page - 1) * limit;

      const { date, month, year } = filterOptions ?? {};
      const filter: {
        businessId: string;
        createdAt?: { $gte: Date; $lte: Date };
      } = { businessId };

      if (date) {
        filter.createdAt = {
          $gte: date,
          $lte: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        };
        return await this.eventsModel
          .find(filter)
          .skip(skip)
          .limit(limit)
          .exec();
      }
      if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        filter.createdAt = { $gte: startDate, $lte: endDate };
        return await this.eventsModel
          .find(filter)
          .skip(skip)
          .limit(limit)
          .exec();
      } else if (year) {
        console.log("year", year);
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        filter.createdAt = { $gte: startDate, $lte: endDate };
        return await this.eventsModel
          .find(filter)
          .skip(skip)
          .limit(limit)
          .exec();
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to get events");
    }
  }

  async getEventsByList(events: string[], paginateOptions) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEvent(userId: string, eventId: string) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEventByCreator(eventId: string, createdById: string) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEventsByCreator(createdById: string, paginateOptions) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async updateEvent(event: UpdateEventsDto, updatedBy: string) {
    //
  }

  async deleteEvents(eventIds: string[], deletedBy: string) {
    //
  }
}
