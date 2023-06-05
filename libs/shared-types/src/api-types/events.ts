import { DocType, GeneralSpecShape, CommonResponseType, UserDocType } from ".";
import { ConvertIdsToStrings, EventType, ServicesType } from "..";

export type EventDocType = DocType<EventType>;
export type EventsDocType = EventDocType[];

export type EventDtoType = ConvertIdsToStrings<EventDocType>;
export type EventsDtoType = EventDtoType[];

export type EventSuccessResponseType = CommonResponseType<EventDtoType>;
export type EventsSuccessResponseType = CommonResponseType<EventsDtoType>;

export type EventsSuccessFnType = (
  payload: EventDocType,
  message: string
) => EventsSuccessResponseType;

export type NewlyCreatedEvent = Omit<
  DocType<EventType>,
  "service" | "staff" | "clients"
> & {
  service: DocType<ServicesType>;
  staff: UserDocType[];
  clients: UserDocType[];
};

type EndpointPath =
  | "/events"
  | "/events/:eventId"
  | "/events/user/:userId"
  | "/events/business/:businessId";

export type EventsEndpointsPaths = EventsEndpointsTypes[EndpointPath]["path"];
export type EventsEndpointsMethods = "POST" | "GET" | "PUT" | "DELETE";

export interface EventsEndpointsTypes extends GeneralSpecShape {
  "/events": {
    path: `/events`;
    methods: {
      POST: {
        query: undefined;
        body: EventDtoType;
        response: EventSuccessResponseType;
      };
      PUT: {
        query: undefined;
        body: EventDtoType;
        response: EventSuccessResponseType;
      };
    };
  };
  "/events/:eventId": {
    path: `/events/${string}`;
    methods: {
      GET: {
        body: undefined;
        response: EventSuccessResponseType;
      };
    };
  };
  "/events/user/:userId": {
    path: `/events/user/${string}`;
    methods: {
      GET: {
        response: EventsSuccessResponseType;
      };
    };
  };
  "/events/business/:businessId": {
    path: `/events/business/${string}`;
    methods: {
      GET: {
        response: EventsSuccessResponseType;
      };
    };
  };
}
