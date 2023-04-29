import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { BusinessUserType, ClientUserType } from "@shortwaits/shared-types";

import { BusinessService } from "./business.service";
import { AtGuard } from "../../common/guards";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { UpdateBusinessDto, CreateBusinessDto } from "./dto/updateBusiness.dto";

/**
 *
 * POST is always for creating a resource ( does not matter if it was duplicated )
 * PUT is for checking if resource exists then update, else create new resource
 * PATCH is always for updating a resource
 *
 */
@UseGuards(AtGuard)
@ApiTags("business")
@ApiBearerAuth("bearer")
@Controller("business")
@UseInterceptors(TransformInterceptor)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Updates business record",
  })
  patchBusiness(
    @Req() request,
    @Body(new ValidationPipe())
    business: UpdateBusinessDto
  ) {
    return this.businessService.updateBusiness(request.user.sub, business);
  }

  /**
   * only admins of the business can retrieve full information
   */
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business record",
  })
  async getBusiness(@Req() request, @Param("id") businessId: string) {
    return this.businessService.getBusiness(businessId, request.user.sub);
  }

  @Get(":id/admins")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business services",
  })
  getBusinessAdmins(@Param("id") businessId: string) {
    return this.businessService.findByKey(businessId, "services");
  }

  @Get(":id/services")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business services",
  })
  getBusinessServices(@Param("id") businessId: string) {
    return this.businessService.findByKey(businessId, "services");
  }

  @Get(":id/categories")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business categories",
  })
  getBusinessCategories(@Param("id") businessId: string) {
    return this.businessService.findByKey(businessId, "categories");
  }

  @Get(":id/hours")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business hours",
  })
  getBusinessHours(@Param("id") businessId: string) {
    return this.businessService.findByKey(businessId, "hours");
  }

  // TODO: we need to paginate

  @Get(":id/events")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business hours",
  })
  getBusinessEvents(@Param("id") businessId: string) {
    return this.businessService.findByKey(businessId, "events");
  }

  // TODO: we need to paginate

  @Get(":id/clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business clients",
  })
  getBusinessClients(@Req() request, @Param("id") businessId: string) {
    return this.businessService.getUsers(
      "client",
      businessId,
      request.user.sub
    );
  }

  @Post(":id/clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Returns created",
  })
  createBusinessClients(
    @Req() request,
    @Param("id") businessId: string,
    @Body() dto: ClientUserType[]
  ) {
    return this.businessService.createBusinessClients(
      request.user.sub,
      businessId,
      dto
    );
  }

  // TODO: we need to paginate

  @Get(":id/staff")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business staff",
  })
  getBusinessStaffByIds(@Req() request, @Param("id") businessId: string) {
    return this.businessService.getUsers("staff", businessId, request.user.sub);
  }

  @Post(":id/staff")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business staff",
  })
  createBusinessStaff(
    @Req() request,
    @Body() dto: BusinessUserType[],
    @Param("id")
    businessId: string
  ) {
    return this.businessService.createBusinessStaff(
      request.user.sub,
      businessId,
      dto
    );
  }

  /**
   * only admins of the business can retrieve full information
   */
  @Put("register")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Register Business",
  })
  async registerBusiness(
    @Req() request,
    @Body(new ValidationPipe())
    business: CreateBusinessDto
  ) {
    return this.businessService.registerBusiness(request.user.sub, business);
  }

  // TODO !!!
  @Put(":id/hours")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Updates business hours",
  })
  putBusiness(
    @Req() request,
    @Param("id") businessId: string,
    @Body() dto: ClientUserType[]
  ) {
    return null;
  }
}
