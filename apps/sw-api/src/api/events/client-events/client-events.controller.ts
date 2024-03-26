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

  @Put("event/:eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Update events",
  })
  async updateEventsByClientId(@Req() request, @Body() body: EventDtoType, @Param("eventId") eventId: string) {
    return this.eventsService.updateEventByClient(eventId, request.user.sub, body);
  }

  @Post("event/join")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Create new event",
  })
  async createEventsByClientId(@Req() request, @Body() body: EventDtoType) {
    return this.eventsService.createEventByClient(request.user.sub, body);
  }

  @Get("details/event/:eventId")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all services in a business",
  })
  async getEventDetails(@Req() request, @Param("serviceId") clientId: string) {
    return this.eventsService.getServicesByBusinessId(clientId);
  }

  @Get("details/events")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get all events in a business (business is NOT a user!!!)",
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
