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
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";

import { EventsService } from "./events.service";
import { CreateEventsDto } from "./dto/create-event.dto";
import { AtGuard } from "../../common/guards";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { PaginationParams } from "../../shared/paginationParams";
import { UpdateEventsDto } from "./dto/update-event.dto";

@UseGuards(AtGuard)
@ApiTags("events")
@ApiBearerAuth("bearer")
@UseInterceptors(TransformInterceptor)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("admin/:businessId/:eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get event record for admin",
  })
  getEventForAdmin(
    @Req() request,
    @Param("businessId") businessId: string,
    @Param("eventId") eventId: string
  ) {
    // validate if user belongs+has right permission with business
    // validate if eventId is in business events
    return this.eventsService.getEvent(eventId);
  }

  @Get("admin/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events for admin",
  })
  getEventsForAdmin(
    @Req() request,
    @Param("businessId") businessId: string,
    @Query() { limit, page }: PaginationParams
  ) {
    // validate  request.user.sub,
    return this.eventsService.getEventsByBusiness(businessId, { limit, page });
  }

  @Get("client/:eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events record for client user",
  })
  getEventForClient(@Req() request, @Param("eventId") eventId: string) {
    return this.eventsService.getEventByCreator(eventId, request.user.sub);
  }

  @Get("client")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events record for client user",
  })
  getEventsForClient(
    @Req() request,
    @Query() { limit, page }: PaginationParams
  ) {
    return this.eventsService.getEventsByCreator(request.user.sub, {
      limit,
      page,
    });
  }

  @Post("admin/:businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  createEventByAdmin(
    @Req() request,
    @Param("businessId") businessId: string,
    @Body() event: CreateEventsDto
  ) {
    // validate permission with business
    return this.eventsService.createEvent(event, request.user.sub);
  }

  @Put("admin/:businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  updateEventByAdmin(
    @Req() request,
    @Param("businessId") businessId: string,
    @Body() event: CreateEventsDto
  ) {
    // validate permission
    return this.eventsService.updateEvent(event, businessId);
  }

  @Delete("admin/:businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Deletes from []",
  })
  deleteEventsByAdmin(@Req() request, @Body() events: string[]) {
    // validate businessId and permission with user
    return this.eventsService.deleteEvents(events, request.user.sub);
  }

  @Post("client")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  createEventByClient(@Req() request, @Body() event: CreateEventsDto) {
    // validate permission
    return this.eventsService.createEvent(event, request.user.sub);
  }

  @Put("client")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: UpdateEventsDto,
  })
  updateEventByClient(@Req() request, @Body() event: UpdateEventsDto) {
    // validate permission
    return this.eventsService.updateEvent(event, request.user.sub);
  }

  @Delete("client")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Deletes from []",
  })
  deleteEventsByClient(@Req() request, @Body() events: string[]) {
    // validate permission
    return this.eventsService.deleteEvents(events, request.user.sub);
  }
}
