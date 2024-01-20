import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUsersResponseType, endpoints } from "@shortwaits/shared-utils";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessUsersResponseType, string>({
    query: businessId => endpoints.getStaffUsers.getConfig([businessId], {}).url,
  });
