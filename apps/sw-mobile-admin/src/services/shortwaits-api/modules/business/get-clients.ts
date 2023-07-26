import { BusinessEndpointsTypes } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessClients } = shortwaitsApiEndpoints.BUSINESS;
type Response =
  BusinessEndpointsTypes["/business/:businessId/clients"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<Response, string>({
    query: businessId => getBusinessClients.getPath(businessId),
  });
