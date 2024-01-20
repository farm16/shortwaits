import { UpdateBusinessDtoType, BusinessResponseType, endpoints } from "@shortwaits/shared-utils";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    BusinessResponseType,
    {
      businessId: string;
      body: UpdateBusinessDtoType;
    }
  >({
    query: ({ body, businessId }) => ({
      ...endpoints.updateBusiness.getConfig([businessId], {}),
      body,
    }),
  });
