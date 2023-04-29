import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventType, ObjectId, UserPayloadType } from "@shortwaits/shared-types";
import { Model } from "mongoose";

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
  /**
   *
   * this finds all events by business not by createdBy(userID)
   * so all events that relate to a business
   */
  async getEventsByBusiness(businessId: string, paginateOptions) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEventsByList(events: string[], paginateOptions) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEvent(eventId: string) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEventByCreator(eventId: string, createdById: string) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async getEventsByCreator(createdById: string, paginateOptions) {
    // const user = await this.businessUserModel.findById(clientId);
  }

  async createEvent(event: CreateEventsDto, createdBy: string) {
    //
  }

  async updateEvent(event: UpdateEventsDto, updatedBy: string) {
    //
  }

  async deleteEvents(eventIds: string[], deletedBy: string) {
    //
  }
}
