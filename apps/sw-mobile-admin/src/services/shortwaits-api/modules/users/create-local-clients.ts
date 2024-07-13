import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddLocalClientsDtoType, AddLocalClientsResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: AddLocalClientsDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddLocalClientsResponseType, RequestType>({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.addBusinessLocalClient.getConfig([businessId], {}),
        body,
      };
    },
  });
