import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CategoriesResponseType, endpoints } from "@shortwaits/shared-lib";

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<CategoriesResponseType, void>({
    query: () => endpoints.getCategories.getQueryConfig(),
  });
