import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddClientsDtoType, ClientsResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: AddClientsDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientsResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessClient.getConfig([businessId], {}),
      body,
    }),
  });
