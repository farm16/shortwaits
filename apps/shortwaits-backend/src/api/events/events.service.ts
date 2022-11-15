import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  EventDocType,
  EventPayloadType,
  EventType,
  NewlyCreatedEvent,
  ObjectId,
  UserPayloadType,
} from "@shortwaits/shared-types";
import { Model, Types } from "mongoose";

import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { BusinessUser } from "../business-user/entities/business-user.entity";
import { Events } from "./entities/events.entity";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(BusinessUser.name)
    private businessUserModel: Model<BusinessUser>
  ) {}

  private createEventPayload(
    event: Events & { _id: ObjectId },
    user: UserPayloadType
  ): Events & { _id: ObjectId } {
    event.status = { statusCode: 0, statusName: "pending" };
    event.createdBy = user._id;
    event.updatedBy = user._id;
    event.isGroupEvent = event.clients.length > 1;
    event.deleted = false;
    event.canceled = false;

    return event;
  }

  async createEventByClient(eventDto: EventType, clientId: Types.ObjectId) {
    // const user = await this.businessUserModel.findById(clientId);
    // // we are using user.businesses[0]
    // const userBusiness = await this.businessModel.findById(user.businesses[0]);
    // if (userBusiness.services.some((service) => service === eventDto.service)) {
    //   const event = await (await this.eventsModel.create(eventDto)).toObject();
    //   return await this.createEventPayload(event, user);
    // }
  }

  async createEventByAdmin(
    eventDto: EventType,
    businessId: Types.ObjectId,
    adminUserId: Types.ObjectId
  ) {
    const user = await this.businessUserModel.findById(adminUserId);
    if (!user) {
      console.log("user", user);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
        statusCode: 412,
      });
    }

    const userBusiness = await this.businessModel.findOne({ _id: businessId });
    if (!userBusiness) {
      console.log("userBusiness >>>", userBusiness);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
        statusCode: 412,
      });
    }

    if (
      userBusiness.services.some((service) => service === eventDto.serviceId)
    ) {
      let event = new this.eventsModel(eventDto);
      userBusiness.events.push(event._id);
      const updatedBusiness = await userBusiness.save();
      event = this.createEventPayload(event, user);
      const newEvent = await event.save();
      const events = await this.eventsModel.find({
        _id: { $in: updatedBusiness.events },
      });

      return {
        business: updatedBusiness,
        event: newEvent,
        events: events,
      };
    } else {
      console.log("serviceId >>>", eventDto.serviceId);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
        statusCode: 412,
      });
    }
  }

  async getAllAdminEvents(
    adminUserId: Types.ObjectId,
    businessId: Types.ObjectId,
    limit = 10,
    page = 1
  ) {
    try {
      const { events: eventIds } = await this.businessModel.findById(
        businessId
      );

      const events = await this.eventsModel
        .find({
          _id: { $in: eventIds },
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await this.eventsModel
        .find({
          _id: { $in: eventIds },
        })
        .count();

      return { meta: { count }, events };
    } catch (error) {
      console.log(error);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to get event.",
        statusCode: 412,
      });
    }
  }

  async findAllByAdmin(adminUserId: Types.ObjectId) {
    return await this.eventsModel.find({ staff: { $in: adminUserId } });
  }
  async findAllByClient(clientUserId: Types.ObjectId) {
    return await this.eventsModel.find({ clients: { $in: clientUserId } });
  }

  async findOne(eventId: Types.ObjectId) {
    return await this.eventsModel.findById(eventId);
  }
}
