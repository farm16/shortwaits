import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessClientsResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessClientsResponseType, string>({
    query: businessId => endpoints.getAllBusinessClients.getQueryConfig({ pathVars: [businessId] }),
  });
