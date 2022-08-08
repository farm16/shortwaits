import {
  ServicesType,
  DocType,
  SuccessResponseType,
  ObjectId,
} from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import configs from "@/config";

const { getBusinessServices } = configs.api.endpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    SuccessResponseType<DocType<ServicesType[]>>,
    string | ObjectId
  >({
    query: (businessId) => getBusinessServices.getPath(businessId as string),
  });
