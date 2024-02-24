import { CommonResponseType, CreateServiceDtoType, ServiceDtoType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: CreateServiceDtoType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CommonResponseType<ServiceDtoType>, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createService.getConfig([businessId], {}),
      body,
    }),
  });
