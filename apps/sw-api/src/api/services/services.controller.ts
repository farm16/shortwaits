import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Put,
  ParseBoolPipe,
  Query,
  NotAcceptableException,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";

import { GetServicesDto, GetServicesQuery } from "./dto/getServiceQuery";

@ApiTags("services")
@Controller("services")
@UseGuards(AtGuard)
@ApiBearerAuth("bearer")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * - this endpoint needs to be protected and should
   *   require search query parameters
   * - we should search by all available params and optimize
   */
  // @Get('all')
  // findAll() {
  //   return this.servicesService.findAll();
  // }

  //returns multiple services search by ids[]
  @Get()
  getServices(@Query() query: GetServicesQuery, @Body() dto: GetServicesDto) {
    if (query.businessId) {
      return this.servicesService.findAllByBusiness(query.businessId);
    }
    if (query.serviceId) {
      return this.servicesService.findOne(query.serviceId);
    }
    if (dto.services && Array.isArray(dto.services) && dto.services.length > 0) {
      return this.servicesService.findByIds(dto.services);
    }
    throw new NotAcceptableException("incorrect service value");
  }

  // @Get('by-ids/:business_id')
  // findByBusiness(@Param('business_id') businessId: string) {
  //   return this.servicesService.findAllByBusiness(businessId);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.servicesService.findOne(id);
  // }

  @Put(":businessId")
  update(@Param("businessId") businessId: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(businessId, updateServiceDto);
  }

  @Post(":businessId")
  create(@Param("businessId") businessId: string, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(businessId, createServiceDto);
  }

  // @Patch(":serviceId")
  // updateSome(@Param("serviceId") serviceId: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.servicesService.update(serviceId, updateServiceDto);
  // }

  @Delete(":serviceId")
  remove(@Param("id") serviceId: string) {
    return this.servicesService.remove(serviceId);
  }
}
