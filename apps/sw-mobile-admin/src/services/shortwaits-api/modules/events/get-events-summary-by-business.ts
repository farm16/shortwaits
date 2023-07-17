import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  EventsSummaryResponseType,
  getEndpointWithParams,
} from "@shortwaits/shared-types";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventsSummaryResponseType, string>({
    query: businessId =>
      getEndpointWithParams("events/business/summary/:businessId", "GET", {
        businessId,
      }).url,
  });
