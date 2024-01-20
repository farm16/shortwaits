import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUserResponseType, BusinessUserUpdateDtoType, endpoints } from "@shortwaits/shared-utils";

type RequestType = {
  businessId: string;
  body: BusinessUserUpdateDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessLocalClient.getConfig([businessId], {}),
      body,
    }),
  });
