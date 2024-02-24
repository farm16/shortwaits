import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ClientAuthResponseType, endpoints } from '@shortwaits/shared-lib';

type RequestType = {
  email: string;
  password: string;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ClientAuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.signInClientLocal.getConfig([], {});
      return {
        url,
        method,
        body: payload,
      };
    },
  });
