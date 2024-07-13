import { BusinessUsersDtoType, ClientsDtoType, CommonResponseType, DtoFriendlyType, EventTransactionType, EventType, LocalClientsDtoType, WithDbProps } from "../../..";

export type FilteredEvent = Omit<EventType, "deleted" | "createdBy" | "updatedBy" | "updatedBy" | "__v" | "_id" | "shortId" | "status">;

export type CreateEventDtoType = DtoFriendlyType<FilteredEvent>;
export type UpdateEventDtoType = DtoFriendlyType<FilteredEvent>;

export type EventDtoType = DtoFriendlyType<WithDbProps<EventType>>;
export type EventsDtoType = EventDtoType[];

export type EventResponseType = CommonResponseType<EventDtoType>;
export type EventsResponseType = CommonResponseType<EventsDtoType>;

export type PeopleInEventResponseType = CommonResponseType<{
  clientUsers: ClientsDtoType;
  localClients: LocalClientsDtoType;
  businessUsers: BusinessUsersDtoType;
  event: EventDtoType;
}>;

export type EventSummaryType = {
  Yesterday: Record<string, number>;
  Week: Record<WeekDay, number>;
  Month: Record<string, number>;
  Year: Record<string, number>;
};

type EventSummary = {
  graphData: EventSummaryType;
  listData: [];
};

export type EventsSummaryResponseType = CommonResponseType<EventSummary>;
type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

// export class RegisterLocalClientsToEventDto {
//   @IsArray()
//   @ApiProperty({ required: false })
//   localClientIds!: string[];

//   @IsString()
//   @ApiProperty({ required: false })
//   eventId!: string;
// }

export type RegisterClientsToEventDtoType = {
  localClientIds: string[];
  eventId: string;
};

export type RegisterLocalClientsToEventDtoType = {
  localClientIds: string[];
  eventId: string;
};

type RegisterLocalClientsToEventResponseData = {
  updatedEvent: WithDbProps<EventType>;
  transactions: EventTransactionType[];
};

export type RegisterLocalClientsToEventResponse = Promise<RegisterLocalClientsToEventResponseData>;

export type RegisterLocalClientsToEventType = {
  Controller(request: any, body: RegisterLocalClientsToEventDtoType): Promise<RegisterLocalClientsToEventResponseData>;
  Client: {
    Request: DtoFriendlyType<RegisterLocalClientsToEventDtoType>;
    Response: CommonResponseType<RegisterLocalClientsToEventResponseData>;
  };
};
