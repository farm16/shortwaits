import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CategoriesResponseType } from "@shortwaits/shared-utils";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getCategories } = shortwaitsApiEndpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<CategoriesResponseType, never>({
    query: () => getCategories.getPath(),
  });
