import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ShortwaitsAdminDefaultDataSuccessResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ShortwaitsAdminDefaultDataSuccessResponseType, void>({
    query: () => endpoints.getShortwaitsAdminMobile.getConfig([], {}).url,
  });
