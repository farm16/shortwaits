import {
  CategoriesType,
  DocType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessCategories } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<CategoriesType>, string>({
    query: (businessId) => `${getBusinessCategories.PATH}/${businessId}`,
  });
