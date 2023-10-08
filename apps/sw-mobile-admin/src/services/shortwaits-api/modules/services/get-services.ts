import { endpoints, ServicesResponseType } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServicesResponseType, string>({
    query: businessId =>
      endpoints.getServices.getConfig([], {
        businessId,
      }).url,
  });
