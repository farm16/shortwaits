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
  GetLocalSignIn,
  GetLocalSignUp,
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
  PostBusinessHours,
} from "./modules";
import { Alert } from "react-native";

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

  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.log("...cannot handle 400 error ");
    Alert.alert(
      `Oops 😮\n${result.error?.data["message"] ?? ""}`,
      `error: ${result.error.status}`
    );
    console.log(JSON.stringify(result, null, 2));
  }
  // await persistor.purge()
  // api.dispatch({ type: "USER_SIGN_OUT" });

  if (result.error && result.error.status === 401 && refreshToken) {
    //Unauthorized
    console.log("401 SERVER ERROR~~", result.error.status);
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("~~401 SERVER ERROR~~");
        console.log("... acquiring refresh token");
        const refreshResult = await baseQuery(
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
            setCredentials(refreshResult.data["auth"] as TokenPayloadType)
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("...unable to retrieve refresh token");
          // await persistor.purge()
          // api.dispatch({ type: "USER_SIGN_OUT" });
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
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: GetLocalSignUp(builder),
    localSignIn: GetLocalSignIn(builder),
    //business
    getBusiness: GetBusiness(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    postBusinessServices: PostBusinessServices(builder),
    postBusinessHours: PostBusinessHours(builder),
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
  usePostBusinessHoursMutation,
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
