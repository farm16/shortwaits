import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateEventDtoType, EventResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateEventDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessEvent.getConfig([businessId], {}),
      body,
    }),
  });
