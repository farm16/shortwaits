import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AllBusinessClientsResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<AllBusinessClientsResponseType, string>({
    query: businessId => endpoints.getAllBusinessClients.getConfig([businessId], {}).url,
  });
