import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";
import { EventsResponseType } from "@shortwaits/shared-types";

const { getEventsSummaryByBusiness } = shortwaitsApiEndpoints.EVENTS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventsResponseType, string>({
    query: businessId => getEventsSummaryByBusiness.getPath(businessId),
  });
