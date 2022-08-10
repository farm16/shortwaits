import {
  ObjectId,
  SuccessResponseType,
  UserType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessStaff } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<UserType[]>, ObjectId | string>({
    query: (businessId: string) => getBusinessStaff.getPath(businessId),
  });
