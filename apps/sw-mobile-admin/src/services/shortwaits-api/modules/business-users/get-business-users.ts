import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUsersResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessUsersResponseType, string>({
    query: businessId => endpoints.getBusinessUsers.getConfig([businessId], {}).url,
  });
