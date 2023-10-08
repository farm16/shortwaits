import { Controller, Get, Inject, Headers, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
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
  getAdminMobileDefaultData(@Headers("device-suggested-language") locale: string) {
    return this.shortwaitsService.getAdminMobileDefaultData(locale);
  }

  @Get("admin/web")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getAdminWebDefaultData(@Headers("device-suggested-language") locale: string) {
    return this.shortwaitsService.getAdminMobileDefaultData(locale);
  }

  @Get("client/mobile")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getWebDefaultData(@Headers("device-suggested-language") locale: string) {
    return this.shortwaitsService.getAdminMobileDefaultData(locale);
  }

  @Get("client/web")
  @Public()
  @ApiCreatedResponse({
    status: 200,
    description: "Returns default data for admin mobile",
    type: Shortwaits,
  })
  getClientWebDefaultData(@Headers("device-suggested-language") locale: string) {
    return this.shortwaitsService.getAdminMobileDefaultData(locale);
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
