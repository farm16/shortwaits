import {
  CreateEventDtoType,
  EventResponseType,
  endpoints,
} from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: CreateEventDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createEventForBusiness.getConfig([businessId], {}),
      body,
    }),
  });
