import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ConfigService } from "@nestjs/config";
import { Service } from "./entities/service.entity";
import { Business } from "../business/entities/business.entity";
import { convertStringToObjectId } from "../../utils/converters";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    private config: ConfigService
  ) {}

  async create(businessId: string, createServiceDto: CreateServiceDto) {
    // todo validate with businessId
    try {
      const _businessId = convertStringToObjectId(businessId);
      const servicePayload = {
        ...createServiceDto,
        businessId: _businessId,
      };

      console.log("servicePayload >>>", JSON.stringify(servicePayload));
      const newService = await this.serviceModel.create(servicePayload);
      return newService;
    } catch (e) {
      console.log("error >>>", e);
    }
  }

  async update(businessId: string, updateServiceDto: UpdateServiceDto) {
    // todo validate with businessId
    const updatedService = await this.serviceModel.findByIdAndUpdate(updateServiceDto._id, updateServiceDto);
    return updatedService;
  }

  async findAll() {
    const services = await this.serviceModel.find({});
    return services;
  }

  async findByIds(servicesId: string[]) {
    const services = await this.serviceModel.find().where("_id").in(servicesId);
    console.log(services);
    return services;
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id);
    return service;
  }

  async remove(id: string) {
    const deletedService = await this.serviceModel.findByIdAndDelete({
      _id: id,
    });
    return deletedService;
  }

  async findAllByBusiness(id: string) {
    console.log("businessID >>>", id);

    const businessServices = await this.businessModel.findById(id);

    console.log("businessServices >>>", businessServices.services);
    // const businessServicesIds = businessServices.map((e) => e.toString());
    const services = await this.serviceModel.find().where("_id").in(businessServices.services);
    console.log("services >>>", services);

    return services;
  }
}
