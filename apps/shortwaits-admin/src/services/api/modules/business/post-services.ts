import configs from "@/config"
import {
  AuthPayloadType,
  ServicesDocType,
  ServicesType,
  SuccessResponseType
} from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { createBusiness } = configs.api.endpoints.BUSINESS

interface BusinessServicePost {
  businessId: ObjectId
  formData: ServicesType
}

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<any, BusinessServicePost>({
    query: ({ businessId, formData }) => ({
      url: `${createBusiness.PATH}/${businessId} `,
      method: createBusiness.METHOD,
      body: formData
    })
  })
