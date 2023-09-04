import { AuthResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  username: string;
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
