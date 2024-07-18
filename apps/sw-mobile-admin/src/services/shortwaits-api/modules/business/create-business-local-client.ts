import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AddLocalClientsDtoType, LocalClientsResponseType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: AddLocalClientsDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<LocalClientsResponseType, RequestType>({
    query: ({ businessId, body }) => {
      console.log("businessId >>>", businessId);
      console.log("body >>>", body);

      return endpoints.createBusinessLocalClients.getMutationConfig({
        pathVars: [businessId],
        body: body,
      });
    },
  });
