import {
  ObjectId,
  SuccessResponseType,
  UserType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import configs from "@shortwaits/admin/config";

const { getBusinessStaff } = configs.api.endpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<UserType[]>, ObjectId | string>({
    query: (businessId: string) => getBusinessStaff.getPath(businessId),
    transformResponse: (response) => response.data,
  });
