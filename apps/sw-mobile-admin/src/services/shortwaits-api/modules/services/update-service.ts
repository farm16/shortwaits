import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CommonResponseType, ServiceDtoType, endpoints } from "@shortwaits/shared-utils";

type RequestType = {
  businessId: string;
  body: ServiceDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CommonResponseType<ServiceDtoType>, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateService.getConfig([businessId], {}),
      body,
    }),
  });
