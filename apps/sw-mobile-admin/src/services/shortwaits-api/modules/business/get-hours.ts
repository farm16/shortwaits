import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BusinessHoursType, CommonResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<BusinessHoursType>, string>({
    query: businessId => endpoints.getBusinessHours.getQueryConfig({ pathVars: [businessId] }),
  });
