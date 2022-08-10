import { shortwaitsApiEndpoints } from "../../configs";
import { setCredentials, RootState } from "../../redux";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { TokenPayloadType } from "@shortwaits/shared-types";

//modules
import {
  GetAdminMobile,
  LocalSignIn,
  LocalSignUp,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessStaff,
  PostBusinessServices,
  PostBusinessRegistration,
  GetCategory,
  GetCategories,
  GetService,
  GetServicesByBusiness,
  GetUser,
} from "./modules";

const API_BASE_URL = shortwaitsApiEndpoints.API_BASE_URL;
const AUTH = shortwaitsApiEndpoints.AUTH;

const mutex = new Mutex();

/**
 * @tutorial
 * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests
 *
 */

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  const {
    auth: { token, refreshToken },
  } = api.getState() as RootState;

  const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // If we have a token set in state, let's assume that we should be passing it.
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`); // we stored the token as "Bearer + key"
      }

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        switch (result.error?.status) {
          case 400:
            console.log("~~400 SERVER ERROR~~");
            break;
          case 401: //Unauthorized
            console.log("~~401 SERVER ERROR~~");
            console.log("... acquiring refresh token");
            if (refreshToken) {
              console.log("...refresh token available");
              const refreshResult: QueryReturnValue<
                { auth: TokenPayloadType } | unknown,
                FetchBaseQueryError,
                FetchBaseQueryMeta
              > = await baseQuery(
                {
                  url: AUTH.refreshToken.PATH,
                  method: AUTH.refreshToken.METHOD,
                  headers: {
                    authorization: `Bearer ${refreshToken}`,
                  },
                },
                api,
                extraOptions
              );
              if (
                refreshResult.meta?.response?.status === 200 &&
                refreshResult.data
              ) {
                api.dispatch(
                  setCredentials(refreshResult.data.auth as TokenPayloadType)
                );
                result = await baseQuery(args, api, extraOptions);
              } else {
                console.log("...unable to retrieve refresh token");
                // await persistor.purge()
                api.dispatch({ type: "USER_SIGN_OUT" });
              }
            } else {
              console.log("...refresh token NOT available");
              // await persistor.purge()
              api.dispatch({ type: "USER_SIGN_OUT" });
            }
            break;
          default: {
            // await persistor.purge()
            api.dispatch({ type: "USER_SIGN_OUT" });
          }
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    //default data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: LocalSignUp(builder),
    localSignIn: LocalSignIn(builder),
    //business
    getBusiness: GetBusiness(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    postBusinessServices: PostBusinessServices(builder),
    postBusinessRegistration: PostBusinessRegistration(builder),
    //categories (business)
    getCategory: GetCategory(builder),
    getCategories: GetCategories(builder),
    //services (business)
    getService: GetService(builder),
    getServicesByBusiness: GetServicesByBusiness(builder),
    //user
    getUser: GetUser(builder),
  }),
});

export const {
  //Mutations hooks
  useLocalSignUpMutation,
  useLocalSignInMutation,
  usePostBusinessServicesMutation,
  usePostBusinessRegistrationMutation,
  //Query hooks
  useGetAdminMobileQuery,
  useGetBusinessQuery,
  useGetBusinessCategoryQuery,
  useGetBusinessHoursQuery,
  useGetBusinessServicesQuery,
  useGetBusinessStaffQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetServiceQuery,
  useGetServicesByBusinessQuery,
  useGetUserQuery,
  //Lazy Query hooks
  useLazyGetUserQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesByBusinessQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
} = shortwaitsApi;
