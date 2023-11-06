import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ClientUsersResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ClientUsersResponseType, string>({
    query: businessId => endpoints.getBusinessClients.getConfig([businessId], {}).url,
  });
