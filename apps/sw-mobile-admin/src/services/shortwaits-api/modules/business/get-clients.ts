import { ClientUsersResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ClientUsersResponseType, string>({
    query: businessId => endpoints.getBusinessClients.getConfig([businessId], {}).url,
  });
