import { SuccessResponseType, UserType } from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import configs from "@/config"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { getBusinessStaff } = configs.api.endpoints.BUSINESS

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<SuccessResponseType<UserType[]>, ObjectId | string>({
    query: (businessId: string) => getBusinessStaff.getPath(businessId),
    transformResponse: response => response.data
  })
