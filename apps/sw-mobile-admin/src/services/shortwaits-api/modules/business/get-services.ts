import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ServicesDtoType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServicesDtoType, string>({
    query: businessId => endpoints.getBusinessServices.getQueryConfig({ pathVars: [businessId] }),
  });
