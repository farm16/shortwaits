import {
  ServicesType,
  DocType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import configs from "@/config";

const { getServices } = configs.api.endpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<DocType<ServicesType[]>>, string[]>({
    query: (servicesIds) => ({
      url: getServices.getPath(),
      body: {
        services: servicesIds,
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => response.data,
  });
