import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, ServiceResponseType } from "@shortwaits/shared-utils";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServiceResponseType, string>({
    query: serviceId =>
      endpoints.getService.getConfig([], {
        serviceId,
      }).url,
  });
