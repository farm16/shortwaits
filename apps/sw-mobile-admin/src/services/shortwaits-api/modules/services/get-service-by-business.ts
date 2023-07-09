import { ServicesResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessServices } = shortwaitsApiEndpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServicesResponseType, string>({
    query: businessId => getBusinessServices.getPath(businessId),
  });
