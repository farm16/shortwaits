import { ServicesType, DocType, SuccessResponseType } from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import configs from "@/config"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { getBusinessServices } = configs.api.endpoints.BUSINESS

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    SuccessResponseType<DocType<ServicesType[]>>,
    string | ObjectId
  >({
    query: businessId => getBusinessServices.getPath(businessId as string)
  })
