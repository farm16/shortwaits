import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventDtoType, EventResponseType, EventsResponseType, endpoints } from "@shortwaits/shared-lib";

type UpdateEventForClientRequest = {
  eventId: string;
  body: EventDtoType;
};
export const withdrawEventForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventsResponseType, UpdateEventForClientRequest>({
    query: ({ eventId, body }) =>
      endpoints.withdrawEventForClient.getMutationConfig({
        pathVars: [eventId],
        body,
      }),
  });

type CreateEventByIdForClientRequest = { eventId: string };
export const registerEventByIdForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, CreateEventByIdForClientRequest>({
    query: ({ eventId }) =>
      endpoints.registerEventByIdForClient.getMutationConfig({
        pathVars: [eventId],
        body: {},
      }),
  });
