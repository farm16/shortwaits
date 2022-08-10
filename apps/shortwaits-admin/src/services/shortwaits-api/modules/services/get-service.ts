import {
  ServicesType,
  DocType,
  SuccessResponseType,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getService } = shortwaitsApiEndpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<DocType<ServicesType[]>>, string>({
    query: (serviceId) => getService.getPath(serviceId),
  });
