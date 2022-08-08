import configs from "@/config"
import {
  AuthPayloadType,
  BusinessType,
  ServicesDocType,
  ServicesType,
  SuccessResponseType,
  UserType
} from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { registerBusiness } = configs.api.endpoints.BUSINESS

interface BusinessServicePost {
  userId: ObjectId | string
  business: Partial<BusinessType>
  services: Partial<ServicesType>[]
}
interface BusinessServicePostResponse {
  data: { user: UserType; business: BusinessType }
  meta: unknown
}

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<BusinessServicePostResponse, BusinessServicePost>({
    query: ({ userId, business, services }) => ({
      url: registerBusiness.PATH,
      method: registerBusiness.METHOD,
      body: { userId, business, services }
    })
  })
