import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateLocalClientUsersDtoType, NewLocalClientUsersResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateLocalClientUsersDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<NewLocalClientUsersResponseType, RequestType>({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.createLocalClientUser.getConfig([businessId], {}),
        body,
      };
    },
  });
