import {
  BusinessHoursType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessHours } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<BusinessHoursType>, BusinessIdType>({
    query: (businessId) => `${getBusinessHours.PATH}/${businessId}`,
  });

/**
 * Business's _id
 */
type BusinessIdType = string;
