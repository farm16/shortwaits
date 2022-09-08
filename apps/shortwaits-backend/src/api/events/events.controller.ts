import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Req,
  Query,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";

import { EventsService } from "./events.service";
import { CreateEventsDto } from "./dto/create-events.dto";
import { AtGuard } from "../../common/guards";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import {
  BusinessEndpointsTypes,
  EventsEndpointsTypes,
  EventType,
} from "@shortwaits/shared-types";
import { PaginationParams } from "../../shared/paginationParams";

type ResponseController =
  EventsEndpointsTypes["/events/admin/:business_id"]["methods"];
@UseGuards(AtGuard)
@ApiTags("events")
@ApiBearerAuth("bearer")
@UseInterceptors(TransformInterceptor)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("admin/:id")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  getAllAdminEvent(
    @Req() request,
    @Param("id") businessId,
    @Query() { limit, page }: PaginationParams
  ): Promise<ResponseController["GET"]["paginatedResponse"]> {
    return this.eventsService.getAllAdminEvents(
      request.user.sub,
      businessId,
      limit,
      page
    );
  }
  /**
   * @id  refer to a Business Id.
   * A business can only post events linked to it \
   * and an existing user
   * */
  @Post("admin/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  createEventByAdmin(
    @Req() request,
    @Param("id") businessId,
    @Body() createEventsDto: EventType
  ) {
    return this.eventsService.createEventByAdmin(
      createEventsDto,
      businessId,
      request.user.sub
    );
  }

  /**
   * @id  refer to a User Id
   * all user are technically clients,
   * remember business user are also users and
   * the therefore they can be treated as a clients
   * users can post new events with any available business
   * */
  @Post("client/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: "Create new event record",
    type: CreateEventsDto,
  })
  createEventByClient(
    @Req() request,
    @Param("id") clientId: Types.ObjectId,
    @Body() createEventsDto: EventType
  ) {
    return this.eventsService.createEventByClient(
      createEventsDto,
      request.user.sub
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: "Get event record",
    type: CreateEventsDto,
  })
  @Get(":id")
  findOne(@Param("id") eventId: Types.ObjectId, @Param() request) {
    return this.eventsService.findOne(eventId);
  }

  // @Get()
  // findAll(@Param() request, @Param("business_id") businessId: Types.ObjectId) {
  //   return this.eventsService.findAll();
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateEventsDto: UpdateEventsDto) {
  //   return this.eventsService.update(+id, updateEventsDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
