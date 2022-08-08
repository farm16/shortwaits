import configs from "@shortwaits/admin/config";
import {
  AuthPayloadType,
  BusinessType,
  ServicesDocType,
  ServicesType,
  SuccessResponseType,
  ObjectId,
  UserType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { registerBusiness } = configs.api.endpoints.BUSINESS;

interface BusinessServicePost {
  userId: ObjectId | string;
  business: Partial<BusinessType>;
  services: Partial<ServicesType>[];
}
interface BusinessServicePostResponse {
  data: { user: UserType; business: BusinessType };
  meta: unknown;
}

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessServicePostResponse, BusinessServicePost>({
    query: ({ userId, business, services }) => ({
      url: registerBusiness.PATH,
      method: registerBusiness.METHOD,
      body: { userId, business, services },
    }),
  });
