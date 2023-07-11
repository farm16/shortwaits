import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ShortwaitsAdminDefaultDataSuccessResponseType } from "@shortwaits/shared-types";
import { getEndpointWithParams } from "@shortwaits/shared-types";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ShortwaitsAdminDefaultDataSuccessResponseType, never>({
    query: () =>
      getEndpointWithParams("shortwaits/admin/mobile", "GET", {}, true),
    transformResponse: (
      response: ShortwaitsAdminDefaultDataSuccessResponseType
    ) => response,
  });
