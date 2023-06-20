import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes, ObjectId } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { createBusinessClient } = shortwaitsApiEndpoints.BUSINESS;

type Endpoint =
  BusinessEndpointsTypes["/business/:businessId/clients"]["methods"]["POST"];
type ResponseType = Endpoint["response"];
type PayloadType = {
  businessId: string;
  businessClients: any[];
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, PayloadType>({
    query: ({ businessId, businessClients }) => ({
      url: createBusinessClient.getPath(businessId),
      method: createBusinessClient.METHOD,
      body: businessClients,
    }),
  });
