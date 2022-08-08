import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { UserType } from "shortwaits-shared"
import configs from "@/config"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { getCategory } = configs.api.endpoints.CATEGORIES

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<UserType, ObjectId>({
    query: id => `${getCategory.PATH}/${id}`
  })
