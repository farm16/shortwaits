import {
  getEndpointWithParams,
  type AuthResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = undefined;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = getEndpointWithParams(
        "auth/admin/local/refresh",
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
