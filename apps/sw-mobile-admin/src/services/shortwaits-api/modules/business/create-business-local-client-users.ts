import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddLocalClientsDtoType, LocalClientUsersResponseType, endpoints } from "@shortwaits/shared-utils";

type RequestType = {
  businessId: string;
  body: AddLocalClientsDtoType;
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
