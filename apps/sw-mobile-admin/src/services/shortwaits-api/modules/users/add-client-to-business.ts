import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddClientToBusinessDtoType, NewLocalClientUsersResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: AddClientToBusinessDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<NewLocalClientUsersResponseType, RequestType>({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.addClientToBusiness.getConfig([businessId], {}),
        body,
      };
    },
  });
