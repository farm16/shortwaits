import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { updateBusiness } = shortwaitsApiEndpoints.BUSINESS;

type ResponseType =
  BusinessEndpointsTypes["/business"]["methods"]["PUT"]["response"];
type PayloadType =
  BusinessEndpointsTypes["/business"]["methods"]["PUT"]["body"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, PayloadType>({
    query: business => ({
      url: updateBusiness.getPath(business._id),
      method: updateBusiness.METHOD,
      body: business,
    }),
  });
