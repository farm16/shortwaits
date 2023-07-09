import {
  BusinessHoursType,
  CommonResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessHours } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<BusinessHoursType>, string>({
    query: businessId => getBusinessHours.getPath(businessId),
  });
