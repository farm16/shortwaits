import { shortwaitsApiEndpoints } from "../../../../configs";
import { AuthPayloadType, SuccessResponseType } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignIn } = shortwaitsApiEndpoints.AUTH;

interface DtoType {
  email: string;
  password: string;
}
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthPayloadType, DtoType>({
    query: (payload) => ({
      url: adminLocalSignIn.PATH,
      method: adminLocalSignIn.METHOD,
      body: payload,
    }),
  });
