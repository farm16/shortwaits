import { getEndpointWithParams } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<any, any>({
    query: payload => {
      const { url, method } = getEndpointWithParams(
        "auth/admin/local/sign-out",
        "POST",
        {},
        true
      );
      return {
        url,
        method,
        body: payload,
      };
    },
  });