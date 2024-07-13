import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventDtoType, EventResponseType, endpoints } from "@shortwaits/shared-lib";

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
        ...endpoints.updateBusinessEvent.getConfig([businessId], {}),
        body,
      };
    },
  });
