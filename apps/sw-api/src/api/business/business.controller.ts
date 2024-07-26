import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AddLocalClientsDtoType, CreateBusinessUsersDtoType, DeleteLocalClientsDtoType, UpdateClientDtoType } from "@shortwaits/shared-lib";
import { AtGuard } from "../../common/guards";
import { convertStringIdToObjectId, getNewBusinessLocalClientsFromDto } from "../../utils";
import { BusinessService } from "./business.service";
import { RegisterBusinessDto } from "./dto/registerBusiness.dto";
import { UpdateBusinessDto } from "./dto/updateBusiness.dto";

@UseGuards(AtGuard)
@ApiTags("business")
@ApiBearerAuth("bearer")
@Controller("business")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Put(":businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Updates business record",
  })
  async updateBusiness(@Param("businessId") businessId: string, @Req() request, @Body(new ValidationPipe()) business: UpdateBusinessDto) {
    return this.businessService.updateBusiness(request.user.sub, businessId, business, false);
  }

  /**
   * Only admins of the business can retrieve full information
   */
  @Get(":businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business record",
  })
  async getBusiness(@Param("businessId") businessId: string, @Req() request) {
    return this.businessService.getBusiness(businessId, request.user.sub);
  }

  @Get(":businessId/admins")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business admins",
  })
  async getBusinessAdmins(@Param("businessId") businessId: string) {
    return this.businessService.findByKey(businessId, "admins");
  }

  @Get(":businessId/services")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business services",
  })
  async getBusinessServices(@Param("businessId") businessId: string) {
    return this.businessService.findByKey(businessId, "services");
  }

  @Get(":businessId/categories")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business categories",
  })
  async getBusinessCategories(@Param("businessId") businessId: string) {
    return this.businessService.findByKey(businessId, "categories");
  }

  @Get(":businessId/hours")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business hours",
  })
  async getBusinessHours(@Param("businessId") businessId: string) {
    return this.businessService.findByKey(businessId, "hours");
  }

  @Get(":businessId/events")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business events",
  })
  async getBusinessEvents(@Param("businessId") businessId: string) {
    return this.businessService.findByKey(businessId, "events");
  }

  @Get(":businessId/all-clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business clients",
  })
  async getClients(@Param("businessId") businessId: string, @Req() request) {
    return this.businessService.getAllClients(request.user.sub, businessId);
  }

  @Post(":businessId/local-clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  async createBusinessLocalClients(@Param("businessId") businessId: string, @Req() request, @Body() dto: AddLocalClientsDtoType) {
    const businessObjectId = convertStringIdToObjectId(businessId);
    const userObjectId = convertStringIdToObjectId(request.user.sub);
    const localClients = getNewBusinessLocalClientsFromDto(dto);

    return this.businessService.createBusinessLocalClients(userObjectId, businessObjectId, localClients);
  }

  @Delete(":businessId/local-clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  async deleteBusinessLocalClients(@Param("businessId") businessId: string, @Req() request, @Body() dto: DeleteLocalClientsDtoType) {
    return this.businessService.deleteBusinessLocalClients(request.user.sub, businessId, dto);
  }

  @Put(":businessId/local-client")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  async updateBusinessLocalClient(@Param("businessId") businessId: string, @Req() request, @Body() dto: UpdateClientDtoType) {
    return this.businessService.updateBusinessLocalClient(request.user.sub, businessId, dto);
  }

  @Get(":businessId/user")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business staff",
  })
  async getBusinessUserByIds(@Param("businessId") businessId: string, @Req() request) {
    return this.businessService.getBusinessUser(businessId, request.user.sub);
  }

  @Post(":businessId/user")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business staff",
  })
  async createBusinessUser(@Param("businessId") businessId: string, @Req() request, @Body() dto: CreateBusinessUsersDtoType) {
    return this.businessService.createBusinessUser(request.user.sub, businessId, dto);
  }

  @Put(":businessId/user")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  async updateBusinessUser(@Param("businessId") businessId: string, @Req() request, @Body() dto: UpdateClientDtoType) {
    return this.businessService.updateBusinessUser(request.user.sub, businessId, dto);
  }

  @Delete(":businessId/user")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  async deleteBusinessUser(@Param("businessId") businessId: string, @Req() request, @Body() dto: UpdateClientDtoType) {
    return this.businessService.deleteBusinessUser(request.user.sub, businessId, dto);
  }

  @Post("registration/complete")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Register Business",
  })
  async registerBusiness(@Req() request, @Body(new ValidationPipe()) business: RegisterBusinessDto) {
    return this.businessService.registerBusiness(request.user.sub, business);
  }
}
