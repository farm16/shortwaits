import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  CommonResponseType,
  CreateEventDtoType,
  EventDtoType,
  EventResponseType,
  EventStatusName,
  EventsResponseType,
  EventsSummaryResponseType,
  PeopleInEventResponseType,
  endpoints,
} from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateEventDtoType;
};

export const createBusinessEvent = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessEvent.getConfig([businessId], {}),
      body,
    }),
  });

export const updateBusinessEvent = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    EventResponseType,
    {
      businessId: string;
      body: Partial<EventDtoType>;
    }
  >({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.updateBusinessEvent.getConfig([businessId], {}),
        body,
      };
    },
  });

export const getBusinessEvents = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    EventsResponseType,
    {
      businessId: string;
      query: {
        page?: number;
        limit?: number;
        date?: string;
        filterBy?: string;
      };
    }
  >({
    query: ({ businessId, query }) => endpoints.getBusinessEvents.getConfig([businessId], query).url,
  });

export const getBusinessEventSummary = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventsSummaryResponseType, string>({
    query: businessId => endpoints.getBusinessEventsSummary.getConfig([businessId], {}).url,
  });

export const getBusinessEventPeople = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<PeopleInEventResponseType, string>({
    query: eventId =>
      endpoints.getBusinessEventPeople.getConfig([], {
        eventId,
      }).url,
  });

export const updateBusinessEventStatus = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    CommonResponseType<EventDtoType>,
    {
      eventId: string;
      status: EventStatusName;
    }
  >({
    query: ({ eventId, status }) => {
      return endpoints.updateBusinessEventStatus.getMutationConfig({
        pathVars: [eventId],
        body: {
          status,
        },
      });
    },
  });

export const updateClientsInBusinessEvent = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    CommonResponseType<EventDtoType>,
    {
      eventId: string;
      clientIds: string[];
      localClientIds: string[];
    }
  >({
    query: ({ eventId, clientIds, localClientIds }) => {
      return endpoints.updateClientsInBusinessEvent.getMutationConfig({
        pathVars: [],
        body: {
          clientIds,
          localClientIds,
          eventId,
        },
      });
    },
  });
