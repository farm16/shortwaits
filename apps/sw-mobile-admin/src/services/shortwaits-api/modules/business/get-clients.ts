import { ClientUsersResponseType } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessClients } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ClientUsersResponseType, string>({
    query: businessId => getBusinessClients.getPath(businessId),
  });
