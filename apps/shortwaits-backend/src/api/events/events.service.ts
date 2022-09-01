import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventType } from "@shortwaits/shared-types";
import { Model, Types } from "mongoose";

import { Business } from "../business/entities/business.entity";
import { Service } from "../services/entities/service.entity";
import { User } from "../users/entities/user.entity";
import { Events } from "./entities/events.entity";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Service.name) private servicesModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  private async createEventPayload(event, creatorId) {
    const service = await this.servicesModel.findById(event.service);

    event.staff = service.staff;
    event.status.statusCode = 0;
    event.status.statusName = "pending";
    event.createdBy = creatorId;
    event.updatedBy = creatorId;
    event.isGroupEvent = event.clients.length > 1;
    event.deleted = false;
    event.canceled = false;
    return event;
  }

  async createEventByClient(eventDto: EventType, clientId: Types.ObjectId) {
    const user = await this.userModel.findById(clientId);
    // we are using user.businesses[0]
    const userBusiness = await this.businessModel.findById(user.businesses[0]);

    if (userBusiness.services.some((service) => service === eventDto.service)) {
      return await this.createEventPayload(eventDto, clientId);
    }
  }

  async createEventByAdmin(
    eventDto: EventType,
    businessId: Types.ObjectId,
    adminUserId: Types.ObjectId
  ) {
    const user = await this.userModel.findById(adminUserId);
    if (!user) {
      console.log("user", user);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
        statusCode: 412,
      });
    }

    const userBusiness = await this.businessModel.findById(businessId);
    if (!userBusiness) {
      console.log("userBusiness", userBusiness);
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
        statusCode: 412,
      });
    }

    if (userBusiness.services.some((service) => service === eventDto.service)) {
      return await this.createEventPayload(eventDto, adminUserId);
    } else {
      throw new PreconditionFailedException({
        error: "Precondition Failed",
        message: "Unable to create event.",
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
