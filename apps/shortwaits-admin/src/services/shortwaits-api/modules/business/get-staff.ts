import { BusinessEndpointsTypes, ObjectId } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { getBusinessStaff } = shortwaitsApiEndpoints.BUSINESS;

type ResponseType =
  BusinessEndpointsTypes["/business/:business_id/staff"]["methods"]["GET"]["response"];

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ResponseType, ObjectId>({
    query: (businessId) =>
      getBusinessStaff.getPath(businessId as unknown as string),
  });
