import configs from "@/config"
import { AuthPayloadType, SuccessResponseType } from "shortwaits-shared"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"

const { adminLocalSignUp } = configs.api.endpoints.AUTH

interface DtoType {
  username: string
  email: string
  password: string
}
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthPayloadType, DtoType>({
    query: payload => ({
      url: adminLocalSignUp.PATH,
      method: adminLocalSignUp.METHOD,
      body: payload
    })
  })
