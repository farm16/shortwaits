import { BusinessUsersResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessUsersResponseType, string>({
    query: businessId => endpoints.getBusinessStaff.getConfig([businessId], {}).url,
  });
