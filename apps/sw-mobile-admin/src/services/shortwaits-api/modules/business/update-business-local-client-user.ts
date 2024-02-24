import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ClientUserResponseType, ClientUserUpdateDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: ClientUserUpdateDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessLocalClient.getConfig([businessId], {}),
      body,
    }),
  });
