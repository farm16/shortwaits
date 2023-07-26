import {
  ServicesType,
  DocType,
  CommonResponseType,
} from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { shortwaitsApiEndpoints } from "../../../../configs";

const { getServices } = shortwaitsApiEndpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<DocType<ServicesType[]>>, string[]>({
    query: servicesIds => ({
      url: getServices.getPath(),
      body: {
        services: servicesIds,
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => response.data,
  });
