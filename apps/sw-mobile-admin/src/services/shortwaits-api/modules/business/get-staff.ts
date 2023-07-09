import { BusinessEndpointsTypes } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessStaff } = shortwaitsApiEndpoints.BUSINESS;

type ResponseType =
  BusinessEndpointsTypes["/business/:businessId/staff"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ResponseType, string>({
    query: businessId => getBusinessStaff.getPath(businessId),
  });
