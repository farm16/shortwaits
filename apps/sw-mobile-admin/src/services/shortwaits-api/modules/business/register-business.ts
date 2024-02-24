import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessDtoType, BusinessResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessResponseType, BusinessDtoType>({
    query: business => ({
      ...endpoints.registerBusiness.getConfig([business._id], {}),
      body: business,
    }),
  });
