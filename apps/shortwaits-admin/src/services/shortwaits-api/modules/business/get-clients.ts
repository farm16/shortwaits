import {
  BusinessEndpointsTypes,
  ObjectId,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessClients } = shortwaitsApiEndpoints.BUSINESS;
type Response =
  BusinessEndpointsTypes["/business/:business_id/clients"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<Response>, ObjectId>({
    query: (businessId) =>
      getBusinessClients.getPath(businessId as unknown as string),
  });
