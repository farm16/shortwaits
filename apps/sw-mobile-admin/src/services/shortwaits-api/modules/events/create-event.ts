import { shortwaitsApiEndpoints } from "../../../../configs";
import {
  CreateEventDtoType,
  EventResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { createEvent } = shortwaitsApiEndpoints.EVENTS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, CreateEventDtoType>({
    query: payload => ({
      url: createEvent.getPath(),
      method: createEvent.METHOD,
      body: payload,
    }),
  });
