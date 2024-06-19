import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CommonResponseType, CreateServiceDtoType, ServiceDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateServiceDtoType;
};

type ResponseType = CommonResponseType<{
  service: ServiceDtoType;
  services: ServiceDtoType[];
}>;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createService.getConfig([businessId], {}),
      body,
    }),
  });
