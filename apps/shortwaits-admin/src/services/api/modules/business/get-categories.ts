import {
  CategoriesType,
  DocType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import configs from "@/config";

const { getBusinessCategories } = configs.api.endpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<CategoriesType>, string>({
    query: (businessId) => `${getBusinessCategories.PATH}/${businessId}`,
  });
