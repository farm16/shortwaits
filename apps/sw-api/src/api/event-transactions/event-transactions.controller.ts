import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../../common/guards";
import { EventTransactionsService } from "./event-transactions.service";

const print = value => console.log("EventTransactionsController >>>", value);

@UseGuards(AtGuard)
@ApiTags("event-transactions")
@Controller("event-transactions")
@ApiBearerAuth("bearer")
export class EventTransactionsController {
  constructor(private readonly eventTransactionsService: EventTransactionsService) {}

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  async getEventTransactionsByBusiness(@Param("businessId") businessId: string) {
    print(businessId);
    return this.eventTransactionsService.getEventTransactionsForBusiness(businessId);
  }
}
