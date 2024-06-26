import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { EventDtoType } from "@shortwaits/shared-lib";
import { AtGuard } from "../../../common/guards";
import { Events } from "../entities/events.entity";
import { EventsService } from "./business-events.service";
import { CreateEventsDto, EventsQueryDto } from "./dto";

@UseGuards(AtGuard)
@ApiTags("events/business")
@ApiBearerAuth("bearer")
@Controller("events/business")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("summary/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get a summary of all events in a business (business is NOT a user!!!)",
  })
  async getEventsSummaryByBusiness(@Param("businessId") businessId: string) {
    return this.eventsService.getEventsSummaryByBusiness(businessId);
  }

  // todo will validate if user in Business has permission to view events
  @Get(":businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business (business is NOT a user!!!)",
  })
  async getEventsByBusiness(@Param("businessId") businessId: string, @Query() query: EventsQueryDto) {
    const { page = 1, limit = 10, date = new Date().toISOString(), filterBy = "year" } = query;
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

  @Post(":businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    type: Events,
    description: "Create new event record by Business User (not client user or business)",
  })
  createEventByBusiness(@Req() request, @Body() event: CreateEventsDto) {
    // todo: validate permission with business
    return this.eventsService.createEvent(event, request.user.sub);
  }

  @Put(":businessId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  updateEventByBusiness(@Req() request, @Param("businessId") businessId: string, @Body() event: EventDtoType) {
    // todo validate permission
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
    // todo validate permission
    return this.eventsService.updateEvent(event, request.user.sub, request.user.sub);
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

  @Get("people")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all people involved in a event",
  })
  async getPeopleByEvent(@Req() request, @Query("eventId") eventId: string) {
    if (!eventId) {
      throw new NotFoundException("Event not found");
    }
    if (!request.user.sub) {
      throw new NotFoundException("User not found");
    }
    return await this.eventsService.getPeopleByEvent(eventId, request.user.sub);
  }
}
