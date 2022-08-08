import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { BusinessSuccessResponseType } from "shortwaits-shared"
import configs from "@/config"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

const { getBusiness } = configs.api.endpoints.BUSINESS

/**
 * @Note
 * If you need another way to dispatch multiple actions
 * please check: @link https://github.com/reduxjs/redux-toolkit/issues/1509
 * @example
 * async onQueryStarted(id, { dispatch, queryFulfilled }) {
 *  //`onStart` side-effect
 *  try {
 *    const { data } = await queryFulfilled
 *    //`onSuccess` side-effect
 *    dispatch(messageCreated('Post received!'))
 *  } catch (err) {
 *    //`onError` side-effect
 *    dispatch(messageCreated('Error fetching post!'))
 *  }
 *},
 */
export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessSuccessResponseType, ObjectId | string>({
    query: businessId => getBusiness.getPath(businessId as string)
  })
