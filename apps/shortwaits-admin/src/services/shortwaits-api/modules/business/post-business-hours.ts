import { BusinessEndpointsTypes } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { putBusinessHours } = shortwaitsApiEndpoints.BUSINESS;

type RequestType = {
  businessId: string;
  payload: BusinessEndpointsTypes["business/:business_id/hours"]["methods"]["PUT"]["body"];
};
type ResponseType =
  BusinessEndpointsTypes["business/:business_id/hours"]["methods"]["PUT"]["return"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, payload }) => ({
      url: putBusinessHours.getPath(businessId),
      method: putBusinessHours.METHOD,
      body: payload,
    }),
  });
