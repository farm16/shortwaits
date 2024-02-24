import { CommonResponseType, CreateServiceDtoType, ServiceDtoType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  serviceId: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CommonResponseType<ServiceDtoType>, RequestType>({
    query: ({ businessId, serviceId }) => ({
      ...endpoints.deleteService.getConfig([serviceId], {
        businessId,
      }),
    }),
  });
