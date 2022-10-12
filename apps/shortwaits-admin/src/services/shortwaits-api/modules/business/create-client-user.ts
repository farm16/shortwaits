import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes, ObjectId } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { createBusinessClient } = shortwaitsApiEndpoints.BUSINESS;

type Endpoint =
  BusinessEndpointsTypes["/business/:business_id/clients"]["methods"]["POST"];
type ResponseType = Endpoint["response"];
type PayloadType = {
  businessId: ObjectId;
  businessClients: Endpoint["body"];
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, PayloadType>({
    query: ({ businessId, businessClients }) => ({
      url: createBusinessClient.getPath(String(businessId)),
      method: createBusinessClient.METHOD,
      body: businessClients,
    }),
  });
