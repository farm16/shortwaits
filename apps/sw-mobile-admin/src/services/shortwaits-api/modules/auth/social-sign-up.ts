import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, type AuthResponseType, SocialAccountType } from "@shortwaits/shared-lib";

type RequestType = {
  authCode: string;
} & SocialAccountType;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => {
      const { url, method } = endpoints.signUpSocial.getConfig([], {});

      return {
        url,
        method,
        body: payload,
      };
    },
  });
