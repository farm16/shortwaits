import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, type ClientAuthResponseType } from "@shortwaits/shared-lib";

type RequestType = {
  kind: string;
  authCode: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientAuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.signInClientSocial.getConfig([], {});

      return {
        url,
        method,
        body: payload,
      };
    },
  });
