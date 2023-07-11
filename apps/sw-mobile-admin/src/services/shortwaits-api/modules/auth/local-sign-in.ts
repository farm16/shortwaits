import {
  AuthResponseType,
  getEndpointWithParams,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  email: string;
  password: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = getEndpointWithParams(
        "auth/admin/local/sign-in",
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
