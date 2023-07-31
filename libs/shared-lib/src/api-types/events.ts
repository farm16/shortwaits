import { GeneralSpecShape, CommonResponseType, ClientUsersDtoType, BusinessUsersDtoType } from ".";
import { ConvertToDtoType, EventType, WithDbProps } from "..";

export type FilteredEvent = Pick<
  EventType,
  | "paymentMethod"
  | "participantsIds"
  | "urls"
  | "location"
  | "attendeeLimit"
  | "registrationFee"
  | "hasNoDuration"
  | "eventImage"
  | "name"
  | "description"
  | "features"
  | "durationInMin"
  | "priceExpected"
  | "isGroupEvent"
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
  businessUsers: BusinessUsersDtoType;
}>;

export type EventSummaryType = {
  Yesterday: Record<string, number>;
  Week: Record<WeekDay, number>;
  Month: Record<string, number>;
  Year: Record<string, number>;
};
export type EventsSummaryResponseType = CommonResponseType<EventSummaryType>;
type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
