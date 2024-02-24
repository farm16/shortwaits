import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessResponseType, UpdateBusinessDtoType, endpoints } from "@shortwaits/shared-lib";

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
