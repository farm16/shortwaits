import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { registerBusiness } = shortwaitsApiEndpoints.BUSINESS;

type ResponseType =
  BusinessEndpointsTypes["/business/register"]["methods"]["PUT"]["response"];
type PayloadType =
  BusinessEndpointsTypes["/business"]["methods"]["PUT"]["body"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, PayloadType>({
    query: (business) => ({
      url: registerBusiness.getPath(String(business._id)),
      method: registerBusiness.METHOD,
      body: business,
    }),
  });
