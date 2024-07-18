import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessUserResponseType, PartialBusinessUserDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: PartialBusinessUserDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateBusinessUser.getConfig([businessId], {}),
      body,
    }),
  });
