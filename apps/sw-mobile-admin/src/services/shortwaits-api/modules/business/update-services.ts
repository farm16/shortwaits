import { shortwaitsApiEndpoints } from "../../../../configs";
import { ObjectId, BusinessEndpointsTypes } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { updateBusinessServices } = shortwaitsApiEndpoints.BUSINESS;

type RequestType = {
  businessId: string | ObjectId;
  services: BusinessEndpointsTypes["/business/:businessId/services"]["methods"]["PUT"]["body"];
};
type ResponseType =
  BusinessEndpointsTypes["/business/:businessId/services"]["methods"]["PUT"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, services }) => ({
      url: updateBusinessServices.getPath(String(businessId)),
      method: updateBusinessServices.METHOD,
      body: services,
    }),
  });
