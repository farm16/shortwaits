import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { UserType } from "@shortwaits/shared-types";
import configs from "@/config";

const { getAllCategories } = configs.api.endpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, unknown>({
    query: () => `${getAllCategories.PATH}`,
  });
