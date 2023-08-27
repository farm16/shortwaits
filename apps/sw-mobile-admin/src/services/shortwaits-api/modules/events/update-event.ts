import { EventDtoType, EventResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    EventResponseType,
    {
      businessId: string;
      body: Partial<EventDtoType>;
    }
  >({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.updateEvents.getConfig([businessId], {}),
        body,
      };
    },
  });
