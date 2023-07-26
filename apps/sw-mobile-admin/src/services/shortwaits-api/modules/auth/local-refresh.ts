import { endpoints, type AuthResponseType } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = undefined;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.refreshLocal.getConfig([], {});
      return {
        url,
        method,
        body: payload,
      };
    },
  });
