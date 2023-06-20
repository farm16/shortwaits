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

import { PaginationParams } from "../../shared/paginationParams";
import { UpdateEventsDto } from "./dto/update-event.dto";
import { Events } from "./entities/events.entity";
import { EventDocType, EventsDocType } from "@shortwaits/shared-types";

@UseGuards(AtGuard)
@ApiTags("events")
@ApiBearerAuth("bearer")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(":eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get a event record by id",
  })
  getEvent(@Req() request, @Param("eventId") eventId: string) {
    // todo validate if user belongs+has right permission with business
    // todo validate if eventId is in business events
    return this.eventsService.getEvent(request.user.sub, eventId);
  }

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

  @Get("business/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business (business is NOT a user!!!)",
  })
  async getEventsByBusiness(
    @Param("businessId") businessId: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("date") date?: Date,
    @Query("month") month?: number,
    @Query("year") year?: number
  ): Promise<EventsDocType> {
    console.log(businessId);
    // const paginateOptions = { page: page ?? 1, limit: limit ?? 10 };
    // const filterOptions = { date, month, year };
    // todo will validate if user in Business has permission to view events
    return this.eventsService.getEventsByBusiness(
      businessId,
      //paginateOptions
      undefined,
      { year: 2023 }
    );
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    type: Events,
    description:
      "Create new event record by User (not business user or business)",
  })
  createEventByUser(
    @Req() request,
    @Param("businessId") businessId: string,
    @Body() event: CreateEventsDto
  ) {
    // validate permission with business
    return this.eventsService.createEvent(event, request.user.sub);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  updateEventByAdmin(@Req() request, @Body() event: CreateEventsDto) {
    // validate permission
    return this.eventsService.updateEvent(event, request.user.sub);
  }
}
