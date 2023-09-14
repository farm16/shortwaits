import { ServiceType, DocType, CommonResponseType } from "@shortwaits/shared-lib";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { shortwaitsApiEndpoints } from "../../../../configs";

const { getService } = shortwaitsApiEndpoints.SERVICES;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CommonResponseType<DocType<ServiceType[]>>, string>({
    query: serviceId => getService.getPath(serviceId),
  });
