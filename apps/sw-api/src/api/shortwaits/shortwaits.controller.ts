import { Controller, Get, Inject } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
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
  getMobileDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    return this.shortwaitsService.getMobileDefaultData();
  }
}
