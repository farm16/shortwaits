import {
  BusinessPayloadType,
  DocType,
  GeneralSpecShape,
  SuccessResponseType,
  UserPayloadType,
} from ".";
import { EventType, ServicesType } from "..";

export type EventsSuccessResponseType = SuccessResponseType<EventPayloadType>;

export type EventPayloadType = DocType<EventType>;

export type EventsSuccessFnType = (
  payload: EventPayloadType,
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
          event: EventPayloadType;
          events: EventPayloadType[];
        };
      };
      GET: {
        query: EventQuery;
        body: undefined;
        response: {
          meta: { count: number };
          data: {
            events: EventPayloadType[];
          };
        };
      };
    };
  };
}
