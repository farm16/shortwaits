import {
  BusinessHoursType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import configs from "@/config";

const { getBusinessHours } = configs.api.endpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<BusinessHoursType>, BusinessIdType>({
    query: (businessId) => `${getBusinessHours.PATH}/${businessId}`,
  });

/**
 * Business's _id
 */
type BusinessIdType = string;
