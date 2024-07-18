import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUsersResponseType, CreateBusinessUsersDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateBusinessUsersDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUsersResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessUser.getConfig([businessId], {}),
      body,
    }),
  });
