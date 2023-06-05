import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";
import { BusinessResponseType } from "@shortwaits/shared-types";

const { getBusiness } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessResponseType, string>({
    query: businessId => getBusiness.getPath(businessId),
  });
