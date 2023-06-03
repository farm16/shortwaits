import { shortwaitsApiEndpoints } from "../../../../configs";
import { AuthResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignUp } = shortwaitsApiEndpoints.AUTH;

interface RequestType {
  username: string;
  email: string;
  password: string;
}
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => ({
      url: adminLocalSignUp.PATH,
      method: adminLocalSignUp.METHOD,
      body: payload,
    }),
  });
