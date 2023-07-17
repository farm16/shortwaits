import {
  CreateEventDtoType,
  EventResponseType,
  getEndpointWithParams,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: CreateEventDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<EventResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...getEndpointWithParams("events/business/:businessId", "POST", {
        businessId,
      }),
      body,
    }),
  });
