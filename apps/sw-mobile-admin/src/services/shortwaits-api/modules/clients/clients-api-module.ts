import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessDtoType, ClientsResponseType, CommonResponseType, endpoints } from "@shortwaits/shared-lib";

export const getBusinessClients = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ClientsResponseType, string>({
    query: businessId => endpoints.getBusinessClients.getConfig([businessId], {}).url,
  });

type AddBusinessClientRequestType = {
  businessId: string;
  clientShortId: string;
};

type AddBusinessClientResponseType = CommonResponseType<BusinessDtoType>;

export const addBusinessClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddBusinessClientResponseType, AddBusinessClientRequestType>({
    query: ({ businessId, clientShortId }) => {
      return {
        ...endpoints.addClientToBusiness.getConfig([businessId], {}),
        body: {
          clientShortId,
        },
      };
    },
  });
