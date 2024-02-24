import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, type AuthResponseType } from "@shortwaits/shared-lib";

type RequestType = {
  username: string;
  email: string;
  password: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.signUpLocal.getConfig([], {});
      return {
        url,
        method,
        body: payload,
      };
    },
  });
