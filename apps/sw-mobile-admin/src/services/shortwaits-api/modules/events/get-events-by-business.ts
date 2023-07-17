import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  EventsResponseType,
  getEndpointWithParams,
} from "@shortwaits/shared-types";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventsResponseType, string>({
    query: businessId =>
      getEndpointWithParams("events/business/:businessId", "GET", {
        businessId,
      }).url,
  });
