import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CategoryResponseType } from "@shortwaits/shared-lib";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getCategory } = shortwaitsApiEndpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<CategoryResponseType, string>({
    query: (categoryId: string) => getCategory.getPath(categoryId),
  });
