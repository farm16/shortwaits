import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ShortwaitsAdminDefaultDataSuccessResponseType } from "@shortwaits/shared-types";
import configs from "@shortwaits/admin/config";

const { getAdminMobile } = configs.api.endpoints.SHORTWAITS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ShortwaitsAdminDefaultDataSuccessResponseType, unknown>({
    query: () => getAdminMobile.PATH,
  });
