import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ServicesDtoType } from "@shortwaits/shared-utils";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessServices } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServicesDtoType, string>({
    query: businessId => getBusinessServices.getPath(businessId),
  });
