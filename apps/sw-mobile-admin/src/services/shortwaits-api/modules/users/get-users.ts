import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ObjectId, BusinessUserType } from "@shortwaits/shared-lib";

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<BusinessUserType, ObjectId>({
    query: id => "",
  });
