import { BusinessUsersDtoType, ClientsDtoType, CommonResponseType, DtoFriendlyType, EventTransactionType, EventType, LocalClientsDtoType, WithDbProps } from "../../..";

export type FilteredEvent = Omit<EventType, "deleted" | "createdBy" | "updatedAt" | "updatedBy" | "__v" | "_id" | "shortId" | "status">;

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

type EventSummary = {
  graphData: GraphData;
  listData: [];
  requestDate: string;
};

export type EventsSummaryResponseType = CommonResponseType<EventSummary>;

export type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type Graph = {
  date?: string;
  eventCount: number;
  events: EventType[];
  revenueCount: number;
};

export type GraphIdentifier = keyof GraphData;

export type GraphData = {
  Today: Record<string, Graph>;
  Yesterday: Record<string, Graph>;
  Week: Record<string, Graph>;
  Month: Record<string, Graph>;
  Year: Record<string, Graph>;
};

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
