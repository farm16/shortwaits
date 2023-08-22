import { CreateBusinessUserDtoType, BusinessUserResponseType, endpoints } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

type RequestType = {
  businessId: string;
  body: CreateBusinessUserDtoType;
};

//business User === Staff
//client User === Client
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessUserResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessStaff.getConfig([businessId], {}),
      body,
    }),
  });
