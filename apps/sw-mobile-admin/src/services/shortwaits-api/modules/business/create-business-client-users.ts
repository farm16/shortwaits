import { CreateClientUsersDtoType, ClientUserResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: CreateClientUsersDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessClient.getConfig([businessId], {}),
      body,
    }),
  });
