import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventDtoType, EventResponseType, EventsResponseType, endpoints } from "@shortwaits/shared-lib";

type UpdateEventForClientRequest = {
  eventId: string;
  body: EventDtoType;
};
export const updateEventForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventsResponseType, UpdateEventForClientRequest>({
    query: ({ eventId, body }) =>
      endpoints.updateEventForClient.getMutationConfig({
        pathVars: [eventId],
        body,
      }),
  });

type CreateEventForClientRequest = {
  body: EventDtoType;
};
export const createEventForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, CreateEventForClientRequest>({
    query: ({ body }) =>
      endpoints.createEventForClient.getMutationConfig({
        body,
      }),
  });
