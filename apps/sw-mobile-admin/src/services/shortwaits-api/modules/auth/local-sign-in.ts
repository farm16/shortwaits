import { shortwaitsApiEndpoints } from "../../../../configs";
import { AuthResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignIn } = shortwaitsApiEndpoints.AUTH;

type RequestType = {
  email: string;
  password: string;
};
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => ({
      url: adminLocalSignIn.getPath(),
      method: adminLocalSignIn.METHOD,
      body: payload,
    }),
  });
