import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { BusinessService } from "./business.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { BusinessSuccessResponse } from "./business.interface";
import { AtGuard } from "../../common/guards";
import { CreateBusinessDto } from "./dto/createBusinessDto";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { UpdateBusinessDto } from "./dto/updateBusinessDto";
import {
  BusinessEndpointsTypes,
  BusinessHoursType,
  BusinessPayloadType,
  BusinessType,
  ServicesType,
} from "@shortwaits/shared-types";
import { Business } from "./entities/business.entity";

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

  @Post() // virtually any registered user with valid token can create business
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Create business record",
    type: BusinessSuccessResponse,
  })
  postBusiness(@Body(new ValidationPipe()) dto: CreateBusinessDto) {
    return this.businessService.createBusiness(dto);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Updates business record",
    type: BusinessSuccessResponse,
  })
  patchBusiness(
    @Req() request,
    @Body(new ValidationPipe())
    dto: {
      business: Partial<BusinessPayloadType>;
    }
  ) {
    return this.businessService.updateBusiness(request.user.sub, dto.business);
  }
  /**
   * only admins of the business can retrieve full information
   */
  @Get(":business_id")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business record",
    type: BusinessSuccessResponse,
  })
  async getBusiness(@Req() request, @Param("business_id") businessId: string) {
    return this.businessService.getBusiness(businessId, request.user.sub);
  }

  @Get(":business_id/admins")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business services",
    type: BusinessSuccessResponse,
  })
  getBusinessAdmins(@Param("business_id") businessId: string) {
    return this.businessService.findByKey(businessId, "services");
  }

  @Get(":business_id/services")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business services",
    type: BusinessSuccessResponse,
  })
  getBusinessServices(@Param("business_id") businessId: string) {
    return this.businessService.findByKey(businessId, "services");
  }

  @Get(":business_id/categories")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business categories",
    type: BusinessSuccessResponse,
  })
  getBusinessCategories(@Param("business_id") businessId: string) {
    return this.businessService.findByKey(businessId, "categories");
  }

  @Get(":business_id/staff")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business staff",
    type: BusinessSuccessResponse,
  })
  getBusinessStaffByIds(
    @Req() request,
    @Param("business_id") businessId: string
  ) {
    return this.businessService.getStaff(businessId, request.user.sub);
  }

  @Get(":business_id/hours")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Returns business hours",
    type: BusinessSuccessResponse,
  })
  getBusinessHours(@Param("business_id") businessId: string) {
    return this.businessService.findByKey(businessId, "hours");
  }

  @Put(":business_id/hours")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Updates business hours",
    type: BusinessSuccessResponse,
  })
  putBusiness(
    @Req() request,
    @Param("business_id") businessId: string,
    @Body()
    dto: BusinessEndpointsTypes["business/:business_id/hours"]["methods"]["PUT"]["body"]
  ) {
    return this.businessService.updateBusinessHours(
      businessId,
      request.user.sub,
      dto
    );
  }

  @Post("registration")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Business registration",
    type: BusinessSuccessResponse,
  })
  postBusinessRegistration(
    @Body(new ValidationPipe())
    dto: {
      userId: string;
      services: Partial<ServicesType>[];
      business: Partial<BusinessType>;
    }
  ) {
    return this.businessService.registerBusiness(dto);
  }
}
