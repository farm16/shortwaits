import { shortwaitsApiEndpoints } from "../../../../configs";
import { AuthPayloadType, SuccessResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignUp } = shortwaitsApiEndpoints.AUTH;

interface DtoType {
  username: string;
  email: string;
  password: string;
}
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthPayloadType, DtoType>({
    query: (payload) => ({
      url: adminLocalSignUp.PATH,
      method: adminLocalSignUp.METHOD,
      body: payload,
    }),
  });
