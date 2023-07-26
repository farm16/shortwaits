import {
  EventDtoType,
  EventResponseType,
  endpoints,
} from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    EventResponseType,
    {
      eventId: string;
      payload: Partial<EventDtoType>;
    }
  >({
    query: ({ eventId, payload }) => {
      return {
        ...endpoints.updateEvents.getConfig([eventId], {}),
        body: payload,
      };
    },
  });
