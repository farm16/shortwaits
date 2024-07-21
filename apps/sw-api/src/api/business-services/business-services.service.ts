import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId, ServiceType } from "@shortwaits/shared-lib";
import { Model } from "mongoose";
import { filterServiceRecord, generateServiceRecordPayload, updateServiceRecord } from "../../utils";
import { Business } from "../business/entities/business.entity";
import { Service } from "./entities/business-service.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    private config: ConfigService
  ) {}

  async findAll() {
    const services = await this.serviceModel.find({});
    return services;
  }

  async findByIds(servicesId: ObjectId[]) {
    const services = await this.serviceModel.find().where("_id").in(servicesId);
    console.log(services);
    return services;
  }

  async findOne(id: ObjectId) {
    const service = await this.serviceModel.findById(id);
    return service;
  }

  async updateBusinessService(serviceId: ObjectId, businessId: ObjectId, service: Partial<ServiceType>) {
    if (!serviceId) {
      throw new UnauthorizedException("Service not found");
    }
    if (!businessId) {
      throw new UnauthorizedException("Business not found");
    }
    if (!service) {
      throw new UnauthorizedException("Invalid service data");
    }

    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = filterServiceRecord({
        ...service,
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

  async findBusinessRecordQuery(businessId: ObjectId) {
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

  async findAllActiveServicesByBusinessQuery(businessId: ObjectId) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const services = await this.serviceModel.find({ businessId: business._id, deleted: false });
      return services;
    } catch (error) {
      console.error("findAllActiveServicesByBusinessQuery >>>", error);
      throw new InternalServerErrorException("Failed to retrieve active services");
    }
  }

  async findAllActiveServicesByBusiness(businessId: ObjectId) {
    const services = await this.findAllActiveServicesByBusinessQuery(businessId);
    return services;
  }

  async update(businessId: ObjectId, userId: ObjectId, service: ServiceType) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = updateServiceRecord(userId, business._id, service);

      const updatedService = await this.updateBusinessService(service._id, business._id, servicePayload);
      const services = await this.findAllActiveServicesByBusinessQuery(business._id);

      return {
        service: updatedService,
        services,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create service");
    }
  }

  async create(businessId: ObjectId, userId: ObjectId, service: ServiceType) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const servicePayload = generateServiceRecordPayload(userId, business._id, service);
      const newService = await this.serviceModel.create(servicePayload);

      if (!service) {
        throw new UnauthorizedException("Failed to create service");
      }

      await this.businessModel.findByIdAndUpdate(businessId, {
        $push: { services: newService._id },
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

  async delete(serviceId: ObjectId, businessId: ObjectId) {
    try {
      const business = await this.findBusinessRecordQuery(businessId);
      const service = await this.updateBusinessService(serviceId, business._id, {
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
