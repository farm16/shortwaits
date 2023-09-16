import { Model } from "mongoose";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ConfigService } from "@nestjs/config";
import { Service } from "./entities/service.entity";
import { Business } from "../business/entities/business.entity";
import { convertStringToObjectId } from "../../utils/converters";
import { getFilteredRecord } from "../../utils/filtersForDtos";
@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    private config: ConfigService
  ) {}

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

  async findAllByBusiness(id: string) {
    console.log("businessID >>>", id);

    const businessServices = await this.businessModel.findById(id);

    console.log("businessServices >>>", businessServices.services);
    // const businessServicesIds = businessServices.map((e) => e.toString());
    const services = await this.serviceModel.find().where("_id").in(businessServices.services);
    console.log("services >>>", services);

    return services;
  }

  async update(businessId: string, updateServiceDto: UpdateServiceDto) {
    // todo validate with businessId
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new UnauthorizedException("Business not found");
      }
      const servicePayload = getFilteredRecord({
        ...updateServiceDto,
        businessId: business._id,
      });

      const newService = await this.serviceModel.findByIdAndUpdate(updateServiceDto._id, servicePayload, {
        new: true,
      });

      return newService;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async create(businessId: string, createServiceDto: CreateServiceDto) {
    // todo validate with businessId
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new UnauthorizedException("Business not found");
      }
      const servicePayload = getFilteredRecord({
        ...createServiceDto,
        businessId: business._id,
      });

      const newService = await this.serviceModel.create(servicePayload);

      if (newService) {
        await this.businessModel.findByIdAndUpdate(businessId, {
          $push: { services: convertStringToObjectId(newService._id) },
        });
      }

      return newService;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async remove(serviceId: string, businessId: string) {
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new UnauthorizedException("Business not found");
      }
      const deletedService = await this.serviceModel.findByIdAndDelete({
        _id: serviceId,
      });

      if (!deletedService) {
        throw new UnauthorizedException("Service not found");
      }

      if (deletedService) {
        await this.businessModel.findByIdAndUpdate(businessId, {
          $pull: { services: deletedService._id },
        });
      }

      return {
        isDeleted: true,
        service: deletedService,
        headerMessage: {
          type: "success",
          message: "Service deleted successfully",
        },
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to delete service");
    }
  }
}
