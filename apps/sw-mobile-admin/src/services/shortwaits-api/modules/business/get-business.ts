import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessResponseType, string>({
    query: businessId => endpoints.getBusiness.getQueryConfig({ pathVars: [businessId] }),
  });
