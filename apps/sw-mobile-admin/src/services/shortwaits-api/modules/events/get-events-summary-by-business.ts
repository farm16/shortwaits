import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventsSummaryResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventsSummaryResponseType, string>({
    query: businessId =>
      endpoints.getEventsBusinessSummary.getConfig([businessId], {}).url,
  });
