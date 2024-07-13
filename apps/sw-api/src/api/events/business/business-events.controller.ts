import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { EventDtoType } from "@shortwaits/shared-lib";
import { AtGuard } from "../../../common/guards";
import { Event } from "../entities/event.entity";
import { EventsService } from "./business-events.service";
import { CreateEventsDto, EventsQueryDto } from "./dto";

@UseGuards(AtGuard)
@ApiTags("business-events")
@ApiBearerAuth("bearer")
@Controller("business-events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("summary/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get a summary of all events in a business (business is NOT a user!!!)",
  })
  async getBusinessEventSummary(@Param("businessId") businessId: string) {
    return this.eventsService.getBusinessEventSummary(businessId);
  }

  // todo will validate if user in Business has permission to view events
  @Get(":businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business (business is NOT a user!!!)",
  })
  async getBusinessEvents(@Param("businessId") businessId: string, @Query() query: EventsQueryDto) {
    const { page = 1, limit = 10, date = new Date().toISOString(), filterBy = "year" } = query;
    console.log(page, limit, date, filterBy);

    return this.eventsService.getBusinessEvents(
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
    type: Event,
    description: "Create new event record by Business User (not client user or business)",
  })
  createEventByBusiness(@Req() request, @Body() event: CreateEventsDto) {
    // todo: validate permission with business
    return this.eventsService.createBusinessEvent(event, request.user.sub);
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
    return this.eventsService.updateBusinessEvent(event, businessId, request.user.sub);
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

  @Post("register/local-clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Register local clients to an event",
  })
  async registerLocalClientToEvent(@Req() request, @Body() body) {
    const { eventId, localClientIds } = body;
    const { sub } = request.user; // todo: business user id to validate permission
    return await this.eventsService.registerLocalClientsToEvent(localClientIds, eventId);
  }

  @Post("register/clients")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Register clients to an event",
  })
  async registerClientToEvent(@Req() request, @Body() body) {
    const { eventId, localClientIds } = body;
    const { sub } = request.user; // todo: business user id to validate permission
    return await this.eventsService.registerClientsToEvent(localClientIds, eventId);
  }

  @Put("status/:eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Update event status",
  })
  async updateEventStatus(@Req() request, @Body() body) {
    const { status } = body;
    const { sub } = request.user; // todo: business user id to validate permission
    //return await this.eventsService.registerClientsToEvent(localClientIds, eventId);
  }
}
