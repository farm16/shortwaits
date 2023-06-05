import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";
import {
  EventsEndpointsTypes,
  CommonResponseType,
  ObjectId,
} from "@shortwaits/shared-types";

const { getAllAdminEvents } = shortwaitsApiEndpoints.EVENTS;
type Response =
  EventsEndpointsTypes["/events/admin/:business_id"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<Response["data"], Response["meta"]>, string>(
    {
      query: businessId =>
        getAllAdminEvents.getPath(businessId as unknown as string),
    }
  );
