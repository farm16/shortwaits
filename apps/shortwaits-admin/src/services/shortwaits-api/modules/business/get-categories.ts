import {
  BusinessCategoryType,
  CommonResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessCategories } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<BusinessCategoryType>, string>({
    query: businessId => getBusinessCategories.getPath(businessId),
  });
