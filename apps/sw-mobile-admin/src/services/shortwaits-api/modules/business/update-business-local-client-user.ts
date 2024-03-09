import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ClientResponseType, UpdateClientDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: UpdateClientDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessLocalClient.getConfig([businessId], {}),
      body,
    }),
  });
