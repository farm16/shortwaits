import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ShortwaitsAdminDefaultDataPayloadType } from "@shortwaits/shared-lib";
import { Public } from "../../common/decorators/auth.decorator";

import { Shortwaits } from "./shortwaits.schema";
import { ShortwaitsService } from "./shortwaits.service";

@ApiTags("shortwaits")
@Controller("shortwaits")
export class ShortwaitsController {
  @Inject(ShortwaitsService)
  private readonly shortwaitsService: ShortwaitsService;

  @Get("admin/mobile")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getAdminMobileDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    return this.shortwaitsService.getAdminMobileDefaultData();
  }

  @Get("admin/web")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getAdminWebDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    return this.shortwaitsService.getAdminMobileDefaultData();
  }

  @Get("client/mobile")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getWebDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    return this.shortwaitsService.getAdminMobileDefaultData();
  }

  @Get("client/web")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getClientWebDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    return this.shortwaitsService.getAdminMobileDefaultData();
  }

  @Get("booking")
  @Public()
  @ApiQuery({
    name: "businessShortId",
    required: true, // You can specify other properties as needed
    description: "The business short ID",
  })
  @ApiQuery({
    name: "clientUserId",
    required: false, // Make clientUserId optional in Swagger by setting required to false
    description: "The client user ID (optional)",
  })
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getBusinessForBooking(
    @Query("businessShortId") businessShortId: string,
    @Query("clientUserId") clientUserId?: string
  ) {
    return this.shortwaitsService.getBusinessForBooking(businessShortId, clientUserId);
  }
}
