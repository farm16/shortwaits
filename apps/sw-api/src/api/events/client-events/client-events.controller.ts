import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { EventDtoType } from "@shortwaits/shared-lib";
import { AtGuard } from "../../../common/guards";
import { EventsService } from "./client-events.service";
import { EventsQueryDto } from "./dto";

@UseGuards(AtGuard)
@ApiTags("client-events")
@ApiBearerAuth("bearer")
@Controller("client-events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Create new event",
  })
  async createEventsByClientId(@Req() request, @Body() body: EventDtoType) {
    return this.eventsService.createEventByClient(request.user.sub, body);
  }

  @Put("withdraw/:shortEventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Withdraw from event by event id",
  })
  async updateEventsByClientId(@Req() request, @Body() body: EventDtoType, @Param("eventId") eventId: string) {
    return this.eventsService.updateEventByClient(eventId, request.user.sub, body);
  }

  @Put("join/:shortEventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Join event by event id",
  })
  async joinEventByEventId(@Req() request, @Body() body: EventDtoType) {
    return this.eventsService.createEventByClient(request.user.sub, body);
  }

  @Get("details/event/:shortEventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get details of an event",
  })
  async getEventDetails(@Req() request, @Param("shortEventId") shortEventId: string) {
    return this.eventsService.getEventByShortEventId(shortEventId);
  }

  @Get("details/events/:clientId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business",
  })
  async getEventsByClientId(@Req() request, @Query() query: EventsQueryDto) {
    const { page = 1, limit = 10, date = new Date().toISOString(), filterBy = "year" } = query;
    console.log(page, limit, date, filterBy);

    return this.eventsService.getEventsByClientId(
      request.user.sub,
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

  @Get("details/service/:serviceId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get a service by id",
  })
  async getServiceDetails(@Req() request, @Param("serviceId") clientId: string) {
    return this.eventsService.getServiceById(clientId);
  }

  @Get("details/services/:businessId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all services in a business",
  })
  async getServicesDetails(@Req() request, @Param("serviceId") clientId: string) {
    return this.eventsService.getServicesByBusinessId(clientId);
  }
}
