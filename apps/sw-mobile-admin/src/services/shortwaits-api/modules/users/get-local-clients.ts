import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { LocalClientsResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<LocalClientsResponseType, string>({
    query: businessId => endpoints.getBusinessLocalClients.getConfig([businessId], {}).url,
  });
