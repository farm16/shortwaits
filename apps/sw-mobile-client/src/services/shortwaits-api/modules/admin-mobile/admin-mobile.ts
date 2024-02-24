import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { endpoints, ShortwaitsAdminDefaultDataSuccessResponseType } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ShortwaitsAdminDefaultDataSuccessResponseType, undefined>({
    query: () => endpoints.getShortwaitsAdminMobile.getConfig([], {}).url,
  });
