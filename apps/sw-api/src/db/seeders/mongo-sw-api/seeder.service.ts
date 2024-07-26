import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder } from "nestjs-seeder";
import { BusinessCategory } from "../../../api/business-categories/business-category.schema";
import { Service } from "../../../api/business-services/entities/business-service.entity";
import { BusinessUser } from "../../../api/business-users/entities/business-user.entity";
import { Business } from "../../../api/business/entities/business.entity";
import { Client } from "../../../api/clients/entities/client.entity";
import { Event } from "../../../api/events/entities/event.entity";
import { LocalClient } from "../../../api/local-clients/entities/local-client.entity";
import { Shortwaits } from "../../../api/shortwaits/entities/shortwaits.entity";
import { print } from "../../../utils";
import { defaultData } from "./default-data";
//import {  DataFactory } from 'nestjs-seeder';

@Injectable()
export class SeederService implements Seeder {
  constructor(
    @InjectModel(BusinessCategory.name) private readonly businessCategoryModel: Model<BusinessCategory>,
    @InjectModel(Shortwaits.name) private readonly shortwaitsModel: Model<Shortwaits>,
    @InjectModel(BusinessUser.name) private readonly businessUserModel: Model<BusinessUser>,
    @InjectModel(Business.name) private readonly businessModel: Model<Business>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(LocalClient.name) private readonly localClientModel: Model<LocalClient>
  ) {}

  async seed() {
    const collectionNames = [BusinessCategory.name, Shortwaits.name];

    print({
      module: "SeederService",
      message: "Seeding collections",
      value: collectionNames,
    });

    const businessCategory = await this.businessCategoryModel.insertMany(defaultData.businessCategories);
    print({
      module: "SeederService",
      message: "Dropped shortwaits collection",
      value: `${businessCategory.length} documents inserted`,
    });

    const shortwaits = await this.shortwaitsModel.insertMany(defaultData.shortwaits);
    print({
      module: "SeederService",
      message: "Dropped shortwaits collection",
      value: `${shortwaits.length} documents inserted`,
    });

    print({
      module: "SeederService",
      message: "Finished seeding collections",
    });
  }

  async drop(): Promise<void> {
    const collectionNames = [BusinessCategory.name, Shortwaits.name, BusinessUser.name, Business.name, Event.name, Service.name, Client.name, LocalClient.name];
    print({
      module: "SeederService",
      message: "Dropping collections",
      value: collectionNames,
    });

    const shortwaits = await this.shortwaitsModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped shortwaits collection",
      value: shortwaits.acknowledged,
    });

    const businessCategory = await this.businessCategoryModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped businessCategory collection",
      value: businessCategory.acknowledged,
    });

    const businessUser = await this.businessUserModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped businessUser collection",
      value: businessUser.acknowledged,
    });

    const business = await this.businessModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped business collection",
      value: business.acknowledged,
    });

    const event = await this.eventModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped event collection",
      value: event.acknowledged,
    });

    const service = await this.serviceModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped service collection",
      value: service.acknowledged,
    });

    const client = await this.clientModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped client collection",
      value: client.acknowledged,
    });

    const localClient = await this.localClientModel.deleteMany({});
    print({
      module: "SeederService",
      message: "Dropped localClient collection",
      value: localClient.acknowledged,
    });

    print({
      module: "SeederService",
      message: "Finished dropping collections",
    });
  }
}
