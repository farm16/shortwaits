import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServicesService } from "./services.service";

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
      return this.servicesService.findAllActiveServicesByBusiness(query.businessId);
    }
    if (query.serviceId) {
      return this.servicesService.findOne(query.serviceId);
    }
    throw new NotAcceptableException("incorrect service value");
  }

  @Put(":businessId")
  update(@Param("businessId") businessId: string, @Body() updateServiceDto: UpdateServiceDto, @Req() request) {
    return this.servicesService.update(businessId, request.user.sub, updateServiceDto);
  }

  @Post(":businessId")
  create(@Param("businessId") businessId: string, @Req() request, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(businessId, request.user.sub, createServiceDto);
  }

  @Delete(":businessId")
  delete(@Param("businessId") businessId: string, @Body("serviceId") serviceId: string) {
    return this.servicesService.delete(serviceId, businessId);
  }
}
