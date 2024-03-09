import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ClientsResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ClientsResponseType, string>({
    query: businessId => endpoints.getBusinessClients.getConfig([businessId], {}).url,
  });
