import { ServicesType, DocType, SuccessResponseType } from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import configs from "@/config"

const { getBusinessServices } = configs.api.endpoints.SERVICES

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<DocType<ServicesType[]>>, string>({
    query: businessId => getBusinessServices.getPath(businessId),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => response.data
  })
