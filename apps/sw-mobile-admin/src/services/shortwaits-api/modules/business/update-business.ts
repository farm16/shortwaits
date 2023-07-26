import {
  BusinessDtoType,
  BusinessResponseType,
  endpoints,
} from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessResponseType, BusinessDtoType>({
    query: business => ({
      ...endpoints.updateBusiness.getConfig([business._id], {}),
      body: business,
    }),
  });
