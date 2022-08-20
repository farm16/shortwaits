import { shortwaitsApiEndpoints } from "../../../../configs";
import {
  AuthPayloadType,
  BusinessType,
  ServicesDocType,
  ServicesType,
  SuccessResponseType,
  ObjectId,
  UserType,
  BusinessPayloadType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { registerBusiness } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessPayloadType, Partial<BusinessType>>({
    query: (business) => ({
      url: registerBusiness.PATH,
      method: registerBusiness.METHOD,
      body: { business },
    }),
  });
