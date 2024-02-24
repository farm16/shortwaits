import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<any, any>({
    query: payload => {
      const { url, method } = endpoints.signOutLocal.getConfig([], {});
      return {
        url,
        method,
        body: payload,
      };
    },
  });
