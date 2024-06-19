import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateServiceDtoType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { convertStringToObjectId } from "../../utils/converters";
import { filterServiceRecord, initServiceRecord, updateServiceRecord } from "../../utils/filtersForDtos";
import { Business } from "../business/entities/business.entity";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Service } from "./entities/service.entity";
@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>, @InjectModel(Business.name) private businessModel: Model<Business>, private config: ConfigService) {}

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

  async updateServiceByBusinessQuery(serviceId: string, businessId: string, updateServiceDto: UpdateServiceDtoType) {
    if (!serviceId) {
      throw new UnauthorizedException("Service not found");
    }
    if (!businessId) {
      throw new UnauthorizedException("Business not found");
    }
    if (!updateServiceDto) {
      throw new UnauthorizedException("Invalid service data");
    }

    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = filterServiceRecord({
        ...updateServiceDto,
        businessId: business._id,
      });

      const newService = await this.serviceModel.findOneAndUpdate(
        {
          _id: serviceId,
          businessId: business._id,
          deleted: false,
        },
        servicePayload,
        {
          new: true,
        }
      );
      if (!newService) {
        throw new UnauthorizedException("Service not found");
      }

      return newService;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async findBusinessRecordQuery(businessId: string) {
    try {
      const business = await this.businessModel.findById(businessId);
      if (!business) {
        throw new UnauthorizedException("Business not found");
      }
      return business;
    } catch (error) {
      console.error("findBusinessRecordQuery >>>", error);
      throw new InternalServerErrorException("Failed to retrieve business");
    }
  }

  async findAllActiveServicesByBusinessQuery(businessId: string) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const services = await this.serviceModel.find({ businessId: business._id, deleted: false });
      return services;
    } catch (error) {
      console.error("findAllActiveServicesByBusinessQuery >>>", error);
      throw new InternalServerErrorException("Failed to retrieve active services");
    }
  }

  async findAllActiveServicesByBusiness(businessId: string) {
    const services = await this.findAllActiveServicesByBusinessQuery(businessId);
    return services;
  }

  async update(businessId: string, userId: string, updateServiceDto: UpdateServiceDto) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = updateServiceRecord(userId, business._id, updateServiceDto);

      const service = await this.updateServiceByBusinessQuery(updateServiceDto._id, business._id, servicePayload);
      const services = await this.findAllActiveServicesByBusinessQuery(business._id);

      return {
        service,
        services,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async create(businessId: string, userId: string, createServiceDto: CreateServiceDto) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = initServiceRecord(userId, business._id, createServiceDto);
      const service = await this.serviceModel.create(servicePayload);

      if (!service) {
        throw new UnauthorizedException("Failed to create service");
      }

      await this.businessModel.findByIdAndUpdate(businessId, {
        $push: { services: convertStringToObjectId(service._id) },
      });

      const services = await this.findAllActiveServicesByBusinessQuery(business._id);

      return {
        service,
        services,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async delete(serviceId: string, businessId: string) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const service = await this.updateServiceByBusinessQuery(serviceId, business._id, {
        deleted: true,
      });
      const services = await this.findAllActiveServicesByBusinessQuery(business._id);

      return {
        service,
        services,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to delete service");
    }
  }
}
