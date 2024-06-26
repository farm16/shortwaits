import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessCategoryType, CommonResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<BusinessCategoryType>, string>({
    query: businessId => endpoints.getBusinessCategories.getQueryConfig({ pathVars: [businessId] }),
  });
