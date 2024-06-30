import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./interceptor";
import {
  GetAdminMobile,
  PostLocalSignIn,
  PostLocalSignOut,
  PostLocalSignUp,
  PostSocialSignIn,
  PostSocialSignUp,
  UploadImageFile,
  getEventDetailsForClient,
  getEventsDetailsForClient,
  getServiceByIdForClient,
  getServicesByBusinessIdsForClient,
  registerEventByIdForClient,
  withdrawEventForClient,
} from "./modules";

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),

    //auth
    localSignUp: PostLocalSignUp(builder),
    localSignIn: PostLocalSignIn(builder),
    localSignOut: PostLocalSignOut(builder),
    socialSignIn: PostSocialSignIn(builder),
    socialSignUp: PostSocialSignUp(builder),

    //file uploads
    uploadImageFile: UploadImageFile(builder),

    //client events
    getEventDetailsForClient: getEventDetailsForClient(builder),
    getEventsDetailsForClient: getEventsDetailsForClient(builder),
    getServiceByIdForClient: getServiceByIdForClient(builder),
    getServicesByBusinessIdsForClient: getServicesByBusinessIdsForClient(builder),
    withdrawEventForClient: withdrawEventForClient(builder),
    registerEventByIdForClient: registerEventByIdForClient(builder),
  }),
});
