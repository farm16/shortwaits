import {
  SuccessResponseType,
  ServicesPayloadType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";
import { Types } from "mongoose";

const { getBusinessServices } = shortwaitsApiEndpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<ServicesPayloadType>, Types.ObjectId>({
    query: (businessId) =>
      getBusinessServices.getPath(businessId as unknown as string),
  });
