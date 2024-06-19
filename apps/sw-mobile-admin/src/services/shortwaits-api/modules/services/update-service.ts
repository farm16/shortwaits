import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CommonResponseType, ServiceDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: ServiceDtoType;
};

type ResponseType = CommonResponseType<{
  service: ServiceDtoType;
  services: ServiceDtoType[];
}>;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.updateService.getConfig([businessId], {}),
      body,
    }),
  });
