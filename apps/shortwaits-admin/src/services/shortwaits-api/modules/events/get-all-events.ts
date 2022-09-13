import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";
import {
  EventsEndpointsTypes,
  CommonResponseType,
} from "@shortwaits/shared-types";
import { Types } from "mongoose";

const { getAllAdminEvents } = shortwaitsApiEndpoints.EVENTS;
type Response =
  EventsEndpointsTypes["/events/admin/:business_id"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    CommonResponseType<Response["data"], Response["meta"]>,
    Types.ObjectId
  >({
    query: (businessId) =>
      getAllAdminEvents.getPath(businessId as unknown as string),
  });
