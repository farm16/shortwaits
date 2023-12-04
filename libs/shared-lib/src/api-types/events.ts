import { BusinessUsersDtoType, ClientUsersDtoType, CommonResponseType, LocalClientUserDtoType } from ".";
import { ConvertToDtoType, EventType, WithDbProps } from "..";

export type FilteredEvent = Pick<
  EventType,
  | "paymentMethod"
  | "participantsIds"
  | "urls"
  | "location"
  | "attendeeLimit"
  | "registrationFee"
  | "hasDuration"
  | "eventImage"
  | "name"
  | "description"
  | "features"
  | "durationInMin"
  | "priceExpected"
  | "isPublicEvent"
  | "repeat"
  // | "payment" // TODO: add when payment model is ready
  | "notes"
  | "labels"
  | "registrationDeadlineTime"
  | "leadClientId"
  | "serviceId"
  | "businessId"
  | "clientsIds"
  | "staffIds"
  | "startTime"
  | "expectedEndTime"
>;

export type CreateEventDtoType = ConvertToDtoType<FilteredEvent>;
export type UpdateEventDtoType = ConvertToDtoType<FilteredEvent>;

export type EventDtoType = ConvertToDtoType<WithDbProps<EventType>>;
export type EventsDtoType = EventDtoType[];

export type EventResponseType = CommonResponseType<EventDtoType>;
export type EventsResponseType = CommonResponseType<EventsDtoType>;

export type PeopleInEventResponseType = CommonResponseType<{
  clientUsers: ClientUsersDtoType;
  localClientUsers: LocalClientUserDtoType;
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
