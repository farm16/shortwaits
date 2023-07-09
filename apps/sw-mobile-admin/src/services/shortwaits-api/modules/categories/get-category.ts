import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CategoriesPayloadType, ObjectId } from "@shortwaits/shared-types";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getCategory } = shortwaitsApiEndpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<CategoriesPayloadType, ObjectId | string>({
    query: (categoryId: string) => getCategory.getPath(categoryId),
  });
