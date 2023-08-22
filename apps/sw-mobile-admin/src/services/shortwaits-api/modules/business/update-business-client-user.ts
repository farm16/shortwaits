import { ClientUserUpdateDtoType, ClientUserResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: ClientUserUpdateDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessClient.getConfig([businessId], {}),
      body,
    }),
  });
