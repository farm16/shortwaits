import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddLocalClientsDtoType, AddLocalClientsResponseType, LocalClientsResponseType, endpoints } from "@shortwaits/shared-lib";

export const getBusinessLocalClients = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<LocalClientsResponseType, string>({
    query: businessId => endpoints.getBusinessLocalClients.getConfig([businessId], {}).url,
  });

type AddBusinessLocalClientRequestType = {
  businessId: string;
  body: AddLocalClientsDtoType;
};

export const addBusinessLocalClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddLocalClientsResponseType, AddBusinessLocalClientRequestType>({
    query: ({ businessId, body }) => {
      return {
        ...endpoints.addBusinessLocalClient.getConfig([businessId], {}),
        body,
      };
    },
  });
