import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CategoryResponseType, endpoints } from "@shortwaits/shared-lib";

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<CategoryResponseType, string>({
    query: (categoryId: string) => endpoints.getCategory.getQueryConfig({ pathVars: [categoryId] }),
  });
