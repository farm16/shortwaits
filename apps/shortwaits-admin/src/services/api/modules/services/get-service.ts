import { ServicesType, DocType, SuccessResponseType } from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import configs from "@/config"

const { getService } = configs.api.endpoints.SERVICES

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<DocType<ServicesType[]>>, string>({
    query: serviceId => getService.getPath(serviceId)
  })
