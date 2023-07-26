import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventsResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    EventsResponseType,
    {
      businessId: string;
      query: {
        page?: number;
        limit?: number;
        date?: string;
        filterBy?: string;
      };
    }
  >({
    query: ({ businessId, query }) =>
      endpoints.getEventsForBusiness.getConfig([businessId], query).url,
  });
