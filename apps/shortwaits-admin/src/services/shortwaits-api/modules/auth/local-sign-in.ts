import { shortwaitsApiEndpoints } from '../../../../configs';
import { AuthResponseType } from '@shortwaits/shared-types';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const { adminLocalSignIn } = shortwaitsApiEndpoints.AUTH;

interface RequestType {
  email: string;
  password: string;
}
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponseType, RequestType>({
    query: payload => ({
      url: adminLocalSignIn.PATH,
      method: adminLocalSignIn.METHOD,
      body: payload,
    }),
  });
