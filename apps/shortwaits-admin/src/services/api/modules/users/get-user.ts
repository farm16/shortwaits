import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ObjectId, UserType } from "@shortwaits/shared-types";
import configs from "@/config";

const { getUser } = configs.api.endpoints.USERS;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, ObjectId>({
    query: (id) => `${getUser.PATH}/${id}`,
  });
