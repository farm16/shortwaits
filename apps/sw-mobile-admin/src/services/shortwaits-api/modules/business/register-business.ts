import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { registerBusiness } = shortwaitsApiEndpoints.BUSINESS;

type MutationType =
  BusinessEndpointsTypes["/business/register"]["methods"]["PUT"];

type ResponseType = MutationType["response"];
type RequestType = MutationType["body"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: business => ({
      url: registerBusiness.getPath(business._id),
      method: registerBusiness.METHOD,
      body: business,
    }),
  });
