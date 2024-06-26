import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUserUpdateDtoType, BusinessUsersResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: BusinessUserUpdateDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUsersResponseType, RequestType>({
    query: ({ businessId, body }) => {
      return endpoints.deleteBusinessStaff.getMutationConfig({
        pathVars: [businessId],
        body,
      });
    },
  });
