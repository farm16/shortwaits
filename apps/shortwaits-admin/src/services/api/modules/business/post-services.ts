import configs from "@shortwaits/admin/config";
import {
  ObjectId,
  AuthPayloadType,
  ServicesDocType,
  ServicesType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { createBusiness } = configs.api.endpoints.BUSINESS;

interface BusinessServicePost {
  businessId: ObjectId;
  formData: ServicesType;
}

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<any, BusinessServicePost>({
    query: ({ businessId, formData }) => ({
      url: `${createBusiness.PATH}/${businessId} `,
      method: createBusiness.METHOD,
      body: formData,
    }),
  });
