import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { DeleteLocalClientsDtoType, LocalClientsResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: DeleteLocalClientsDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<LocalClientsResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.deleteBusinessLocalClients.getConfig([businessId], {}),
      body,
    }),
  });
