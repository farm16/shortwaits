import { shortwaitsApiEndpoints } from "../../../../configs";
import type { AuthResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignUp } = shortwaitsApiEndpoints.AUTH;

type RequestType = {
  username: string;
  email: string;
  password: string;
};
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => ({
      url: adminLocalSignUp.getPath(),
      method: adminLocalSignUp.METHOD,
      body: payload,
    }),
  });
