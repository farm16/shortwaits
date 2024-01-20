import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, ServicesResponseType } from "@shortwaits/shared-utils";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServicesResponseType, string>({
    query: businessId =>
      endpoints.getServices.getConfig([], {
        businessId,
      }).url,
  });
