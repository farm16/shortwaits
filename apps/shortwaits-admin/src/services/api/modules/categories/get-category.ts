import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ObjectId, UserType } from "@shortwaits/shared-types";
import configs from "@shortwaits/admin/config";

const { getCategory } = configs.api.endpoints.CATEGORIES;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, ObjectId>({
    query: (id) => `${getCategory.PATH}/${id}`,
  });
