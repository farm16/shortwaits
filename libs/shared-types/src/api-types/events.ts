import { GeneralSpecShape, CommonResponseType } from ".";
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
  | "payment"
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

type EndpointPath =
  | "/events"
  | "/events/:eventId"
  | "/events/user/:userId"
  | "/events/business/:businessId";

export type EventsEndpointsPaths = EventsEndpointsTypes[EndpointPath]["path"];
export type EventsEndpointsMethods = "POST" | "GET" | "PUT" | "DELETE";

export type CreateEventDtoType = ConvertToDtoType<FilteredEvent>;
export type UpdateEventDtoType = ConvertToDtoType<FilteredEvent>;

export type EventDtoType = ConvertToDtoType<WithDbProps<EventType>>;
export type EventsDtoType = EventDtoType[];

export type EventResponseType = CommonResponseType<EventDtoType>;
export type EventsResponseType = CommonResponseType<EventsDtoType>;

export interface EventsEndpointsTypes extends GeneralSpecShape {
  "/events": {
    path: `/events`;
    methods: {
      POST: {
        query: undefined;
        body: EventDtoType;
        response: EventResponseType;
      };
      PUT: {
        query: undefined;
        body: EventDtoType;
        response: EventResponseType;
      };
    };
  };
  "/events/:eventId": {
    path: `/events/${string}`;
    methods: {
      GET: {
        body: undefined;
        response: EventsResponseType;
      };
    };
  };
  "/events/user/:userId": {
    path: `/events/user/${string}`;
    methods: {
      GET: {
        response: EventsResponseType;
      };
    };
  };
  "/events/business/:businessId": {
    path: `/events/business/${string}`;
    methods: {
      GET: {
        response: EventsResponseType;
      };
    };
  };
}
