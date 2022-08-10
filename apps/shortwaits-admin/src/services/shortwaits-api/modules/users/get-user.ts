import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ObjectId, UserType } from "@shortwaits/shared-types";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getUser } = shortwaitsApiEndpoints.USERS;

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, ObjectId>({
    query: (id) => `${getUser.PATH}/${id}`,
  });
