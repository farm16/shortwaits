import {
  BusinessEndpointsTypes,
  ObjectId,
  CommonResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessClients } = shortwaitsApiEndpoints.BUSINESS;
type Response =
  BusinessEndpointsTypes["/business/:businessId/clients"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<Response>, ObjectId>({
    query: businessId =>
      getBusinessClients.getPath(businessId as unknown as string),
  });
