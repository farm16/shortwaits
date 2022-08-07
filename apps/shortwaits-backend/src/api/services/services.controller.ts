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
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard } from '../../common/guards';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { GetServicesDto, GetServicesQuery } from './dto/getServiceQuery';

@UseGuards(AtGuard)
@ApiTags('services')
@ApiBearerAuth('bearer')
@UseInterceptors(TransformInterceptor)
@Controller('services')
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

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  //returns multiple services search by ids[]
  @Get()
  getServices(@Query() query: GetServicesQuery, @Body() dto: GetServicesDto) {
    if (query.businessId) {
      return this.servicesService.findAllByBusiness(query.businessId);
    }
    if (query.serviceId) {
      return this.servicesService.findOne(query.serviceId);
    }
    if (
      dto.services &&
      Array.isArray(dto.services) &&
      dto.services.length > 0
    ) {
      return this.servicesService.findByIds(dto.services);
    }
    throw new NotAcceptableException('incorrect service value');
  }

  // @Get('by-ids/:business_id')
  // findByBusiness(@Param('business_id') businessId: string) {
  //   return this.servicesService.findAllByBusiness(businessId);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.servicesService.findOne(id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Patch(':id')
  updateSome(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
