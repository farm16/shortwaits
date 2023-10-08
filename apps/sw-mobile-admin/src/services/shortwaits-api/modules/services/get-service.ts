import { endpoints, ServiceResponseType } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServiceResponseType, string>({
    query: serviceId =>
      endpoints.getService.getConfig([], {
        serviceId,
      }).url,
  });
