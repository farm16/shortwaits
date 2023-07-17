import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Req,
  Query,
  Put,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
} from "@nestjs/swagger";

import { EventsService } from "./events.service";
import { CreateEventsDto } from "./dto/create-event.dto";
import { AtGuard } from "../../common/guards";
import { Events } from "./entities/events.entity";
import { DeleteEventsDto } from "./dto/delete-events.dto";
import { GetEventsByBusinessDto } from "./dto/get-events-by-business.dto";
import { EventDtoType } from "@shortwaits/shared-types";

@UseGuards(AtGuard)
@ApiTags("events")
@ApiBearerAuth("bearer")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("business/summary/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description:
      "Get a summary of all events in a business (business is NOT a user!!!)",
  })
  async getEventsSummaryByBusiness(@Param("businessId") businessId: string) {
    return this.eventsService.getEventsSummaryByBusiness(businessId);
  }

  // todo will validate if user in Business has permission to view events
  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business (business is NOT a user!!!)",
  })
  async getEventsByBusiness(
    @Param("businessId") businessId: string,
    @Query() query: GetEventsByBusinessDto
  ) {
    const {
      page,
      limit,
      date = new Date().toISOString(),
      filterBy = "year",
    } = query;
    console.log(page, limit, date, filterBy);

    return this.eventsService.getEventsByBusiness(
      businessId,
      {
        page,
        limit,
      },
      {
        date,
        filterBy,
      }
    );
  }

  @Post("business/:businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    type: Events,
    description:
      "Create new event record by Business User (not client user or business)",
  })
  createEventByBusiness(
    @Req() request,
    @Param("businessId") businessId: string,
    @Body() event: CreateEventsDto
  ) {
    // todo: validate permission with business
    return this.eventsService.createEvent(event, request.user.sub);
  }

  // @Post("client")
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiCreatedResponse({
  //   status: HttpStatus.ACCEPTED,
  //   type: Events,
  //   description:
  //     "Create new event record by client (not business user or business)",
  // })
  // createEventByClient(
  //   @Req() request,
  //   @Body() event: CreateEventsDto
  // ) {
  //   // todo: validate permission with business
  //   return this.eventsService.createEvent(event, request.user.sub);
  // }

  @Put("business/:businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  updateEventByBusiness(
    @Req() request,
    @Param("businessId") businessId: string,
    @Body() event: EventDtoType
  ) {
    // validate permission
    return this.eventsService.updateEvent(event, businessId, request.user.sub);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  updateEventByUser(@Req() request, @Body() event: EventDtoType) {
    // validate permission
    return this.eventsService.updateEvent(
      event,
      request.user.sub,
      request.user.sub
    );
  }

  @Put("delete/:eventId")
  @HttpCode(202)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Event deleted successfully.",
  })
  async deleteEvent(@Req() request, @Param("eventId") eventId: string) {
    try {
      return await this.eventsService.deleteEvent(eventId, request.user.sub);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException("Failed to delete event");
    }
  }

  @Put("delete")
  @HttpCode(202)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Events deleted successfully.",
  })
  async deleteEvents(@Req() request, @Body() eventIds: string[]) {
    return await this.eventsService.deleteEvents(eventIds, request.user.sub);
  }
}

// @Get(":eventId")
// @HttpCode(HttpStatus.OK)
// @ApiCreatedResponse({
//   status: HttpStatus.OK,
//   description: "Get a event record by id",
// })
// getEvent(@Req() request, @Param("eventId") eventId: string) {
//   // todo validate if user belongs+has right permission with business
//   // todo validate if eventId is in business events
//   return this.eventsService.getEvent(request.user.sub, eventId);
// }

// @Get("user/:userId")
// @HttpCode(HttpStatus.OK)
// @ApiCreatedResponse({
//   status: HttpStatus.OK,
//   description: "Get all events for a user",
// })
// @ApiQuery({ name: "page", type: Number, required: false })
// @ApiQuery({ name: "limit", type: Number, required: false })
// @ApiQuery({ name: "date", type: Date, required: false })
// @ApiQuery({ name: "month", type: Number, required: false })
// @ApiQuery({ name: "year", type: Number, required: false })
// async getEventsByUser(
//   @Param("businessId") businessId: string,
//   @Query("page") page?: number,
//   @Query("limit") limit?: number,
//   @Query("date") date?: Date,
//   @Query("month") month?: number,
//   @Query("year") year?: number
// ): Promise<Events[]> {
//   const paginateOptions = { page, limit };
//   const filterOptions = { date, month, year };
//   // todo will validate if user in Business has permission to view events
//   return this.eventsService.getEventsByBusiness(
//     businessId,
//     paginateOptions,
//     filterOptions
//   );
// }
