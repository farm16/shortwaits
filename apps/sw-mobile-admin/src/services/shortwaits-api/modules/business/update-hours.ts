import { BusinessEndpointsTypes } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { updateBusinessHours } = shortwaitsApiEndpoints.BUSINESS;

type RequestType = {
  businessId: string;
  payload: BusinessEndpointsTypes["/business/:businessId/hours"]["methods"]["PUT"]["body"];
};
type ResponseType =
  BusinessEndpointsTypes["/business/:businessId/hours"]["methods"]["PUT"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, payload }) => ({
      url: updateBusinessHours.getPath(businessId),
      method: updateBusinessHours.METHOD,
      body: payload,
    }),
  });
