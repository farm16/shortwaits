import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessDtoType, BusinessUsersDtoType, CommonResponseType, CreateBusinessUsersDtoType, endpoints } from "@shortwaits/shared-lib";

type RequestType = {
  businessId: string;
  body: CreateBusinessUsersDtoType;
};

type ResponseType = CommonResponseType<{
  business: BusinessDtoType;
  businessUsers: BusinessUsersDtoType;
}>;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: ({ businessId, body }) => ({
      ...endpoints.createBusinessUser.getConfig([businessId], {}),
      body,
    }),
  });
