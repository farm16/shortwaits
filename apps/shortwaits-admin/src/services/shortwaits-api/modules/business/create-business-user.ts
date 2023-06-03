import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessEndpointsTypes, ObjectId } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { createBusinessUser } = shortwaitsApiEndpoints.BUSINESS;

type Endpoint =
  BusinessEndpointsTypes["/business/:business_id/staff"]["methods"]["POST"];
type ResponseType = Endpoint["response"];
type PayloadType = {
  businessId: ObjectId;
  businessClients: Endpoint["body"];
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, PayloadType>({
    query: ({ businessId, businessClients }) => ({
      url: createBusinessUser.getPath(String(businessId)),
      method: createBusinessUser.METHOD,
      body: businessClients,
    }),
  });
