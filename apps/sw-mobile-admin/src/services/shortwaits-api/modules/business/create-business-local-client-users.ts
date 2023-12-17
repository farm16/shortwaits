import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateLocalClientUsersDtoType, LocalClientUsersResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateLocalClientUsersDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<LocalClientUsersResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessLocalClient.getConfig([businessId], {}),
      body,
    }),
  });
