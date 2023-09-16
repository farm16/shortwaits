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
  getServices(@Query() query: GetServicesQuery) {
    if (query.businessId) {
      return this.servicesService.findAllByBusiness(query.businessId);
    }
    if (query.serviceId) {
      return this.servicesService.findOne(query.serviceId);
    }
    throw new NotAcceptableException("incorrect service value");
  }

  @Put(":businessId")
  update(@Param("businessId") businessId: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(businessId, updateServiceDto);
  }

  @Post(":businessId")
  create(@Param("businessId") businessId: string, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(businessId, createServiceDto);
  }

  @Delete(":serviceId")
  remove(@Param("serviceId") serviceId: string, @Query("businessId") businessId: string) {
    return this.servicesService.remove(serviceId, businessId);
  }
}
