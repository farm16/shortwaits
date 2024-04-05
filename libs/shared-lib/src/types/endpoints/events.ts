import { BusinessUsersDtoType, ClientsDtoType, CommonResponseType, LocalClientsDtoType } from ".";
import { ConvertToDtoType, EventType, WithDbProps } from "..";

export type FilteredEvent = Omit<EventType, "deleted" | "createdBy" | "updatedBy" | "updatedBy" | "__v" | "_id" | "shortId" | "status">;

export type CreateEventDtoType = ConvertToDtoType<FilteredEvent>;
export type UpdateEventDtoType = ConvertToDtoType<FilteredEvent>;

export type EventDtoType = ConvertToDtoType<WithDbProps<EventType>>;
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
