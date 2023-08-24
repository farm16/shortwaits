import { BusinessUsersResponseType, EventResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  body: string[];
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUsersResponseType, RequestType>({
    query: ({ body }) => ({
      ...endpoints.getBusinessUsers.getConfig([], {}),
      body,
    }),
  });
