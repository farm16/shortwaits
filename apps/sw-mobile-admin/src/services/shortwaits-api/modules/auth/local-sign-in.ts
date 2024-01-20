import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { AuthResponseType, endpoints } from "@shortwaits/shared-utils";

type RequestType = {
  email: string;
  username?: string;
  password: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.signInLocal.getConfig([], {});
      return {
        url,
        method,
        body: payload,
      };
    },
  });
