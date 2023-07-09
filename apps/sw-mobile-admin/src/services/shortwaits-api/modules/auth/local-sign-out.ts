import { shortwaitsApiEndpoints } from "../../../../configs";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { adminLocalSignOut } = shortwaitsApiEndpoints.AUTH;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<any, any>({
    query: () => ({
      url: adminLocalSignOut.getPath(),
      method: adminLocalSignOut.METHOD,
    }),
  });
