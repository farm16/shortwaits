import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { LocalClientUsersResponseType, endpoints } from "@shortwaits/shared-utils";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<LocalClientUsersResponseType, string>({
    query: businessId => endpoints.getLocalClientUsers.getConfig([businessId], {}).url,
  });
