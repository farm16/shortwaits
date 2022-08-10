import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { UserType } from "@shortwaits/shared-types";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getAllCategories } = shortwaitsApiEndpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, unknown>({
    query: () => `${getAllCategories.PATH}`,
  });
