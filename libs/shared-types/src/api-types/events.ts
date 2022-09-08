import {
  BusinessPayloadType,
  CommonResponseType,
  DocType,
  GeneralSpecShape,
  SuccessResponseType,
  UserPayloadType,
} from ".";
import { EventType, ServicesType } from "..";

export type EventsSuccessResponseType = SuccessResponseType<EventsPayloadType>;

export type EventsPayloadType = DocType<EventType>;

export type EventsSuccessFnType = (
  payload: EventsPayloadType,
  message: string
) => EventsSuccessResponseType;

export type NewlyCreatedEvent = Omit<
  DocType<EventType>,
  "service" | "staff" | "clients"
> & {
  service: DocType<ServicesType>;
  staff: UserPayloadType[];
  clients: UserPayloadType[];
};

type EventQuery = {
  limit?: number;
  page?: number;
};
export interface EventsEndpointsTypes extends GeneralSpecShape {
  "/events/admin/:business_id": {
    path: `/events/admin/${string}`;
    methods: {
      POST: {
        query: undefined;
        body: EventType;
        response: {
          business: BusinessPayloadType;
          event: EventsPayloadType;
          events: EventsPayloadType[];
        };
      };
      GET: {
        query: EventQuery;
        body: undefined;
        paginatedResponse: {
          events: EventsPayloadType[];
          meta: { count: number };
        };
      };
    };
  };
}
