import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ShortwaitsAdminDefaultDataSuccessResponseType } from "@shortwaits/shared-types";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getAdminMobile } = shortwaitsApiEndpoints.SHORTWAITS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ShortwaitsAdminDefaultDataSuccessResponseType, unknown>({
    query: () => getAdminMobile.PATH,
  });