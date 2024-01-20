import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddClientToBusinessDtoType, AddLocalClientsResponseType, endpoints } from "@shortwaits/shared-utils";

type RequestType = {
  businessId: string;
  body: AddClientToBusinessDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddLocalClientsResponseType, RequestType>({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.addClientToBusiness.getConfig([businessId], {}),
        body,
      };
    },
  });
