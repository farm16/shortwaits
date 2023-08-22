import { BusinessUserUpdateDtoType, BusinessUserResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: BusinessUserUpdateDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessClient.getConfig([businessId], {}),
      body,
    }),
  });
