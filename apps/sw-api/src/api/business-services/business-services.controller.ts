import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { ServicesService } from "./business-services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

import { convertBusinessServiceDtoToRecord, convertStringIdToObjectId } from "../../utils";
import { GetServicesQuery } from "./dto/getServiceQuery";

/**
 * TODO:
 * - this endpoint needs to be protected and should require search query parameters
 * TODO:
 * - we should search by all available params and optimize
 */
@ApiTags("services")
@Controller("services")
@UseGuards(AtGuard)
@ApiBearerAuth("bearer")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getServices(@Query() query: GetServicesQuery, @Req() request) {
    if (query.businessId) {
      const businessId = convertStringIdToObjectId(query.businessId);
      return this.servicesService.findAllActiveServicesByBusiness(businessId);
    }
    if (query.serviceId) {
      const serviceId = convertStringIdToObjectId(query.serviceId);
      return this.servicesService.findOne(serviceId);
    }
    throw new NotAcceptableException("incorrect service value");
  }

  @Put(":businessId")
  update(@Param("businessId") businessId: string, @Body() serviceDto: UpdateServiceDto, @Req() request) {
    const businessIdObj = convertStringIdToObjectId(businessId);
    const userIdObj = convertStringIdToObjectId(request.user.sub);
    const serviceRecord = convertBusinessServiceDtoToRecord(serviceDto);

    return this.servicesService.update(businessIdObj, userIdObj, serviceRecord);
  }

  @Post(":businessId")
  create(@Param("businessId") businessId: string, @Req() request, @Body() serviceDto: CreateServiceDto) {
    const businessIdObj = convertStringIdToObjectId(businessId);
    const userIdObj = convertStringIdToObjectId(request.user.sub);
    const serviceRecord = convertBusinessServiceDtoToRecord(serviceDto);

    return this.servicesService.create(businessIdObj, userIdObj, serviceRecord);
  }

  @Delete(":businessId")
  delete(@Param("businessId") businessId: string, @Body("serviceId") serviceId: string) {
    const businessIdObj = convertStringIdToObjectId(businessId);
    const serviceIdObj = convertStringIdToObjectId(serviceId);

    return this.servicesService.delete(businessIdObj, serviceIdObj);
  }
}
