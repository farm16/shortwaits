import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { AuthResponseType, endpoints } from "@shortwaits/shared-lib";
import { Mutex } from "async-mutex";
import { shortwaitsApi } from "../../configs";
import { RootState, setCredentials } from "../../store";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: shortwaitsApi.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const deviceInfo = (getState() as RootState).mobileAdmin.deviceInfo;
    const suggestedLanguage = (getState() as RootState).mobileAdmin.suggestedLanguage;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`); // we stored the token as "Bearer + key"
    }

    headers.set("device-language", deviceInfo?.language ?? "en");
    headers.set("device-suggested-language", suggestedLanguage ?? ""); // used as store indicator
    headers.set("os", deviceInfo?.os ?? "");
    headers.set("os-version", deviceInfo?.osVersion ?? "");

    return headers;
  },
});

const getBaseQueryExtraOptions = (
  token: string,
  deviceInfo: {
    language: string;
    os: string;
    osVersion: string;
  },
  suggestedLanguage: string,
  extraHeaders: HeadersInit = {}
) => {
  return {
    ...extraHeaders,
    prepareHeaders: (headers: Headers) => {
      console.log(">>> prepareHeaders");
      console.log("headers: ", headers);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token && !headers.has("Authorization")) {
        console.log(">>> setting token in headers");
        console.log(`Authorization: Bearer ${token} `);
        headers.set("Authorization", `Bearer ${token}`); // we stored the token as "Bearer + key"
      }

      headers.set("device-language", deviceInfo?.language ?? "en");
      headers.set("device-suggested-language", suggestedLanguage ?? ""); // used as store indicator
      headers.set("os", deviceInfo?.os ?? "");
      headers.set("os-version", deviceInfo?.osVersion ?? "");

      return headers;
    },
  };
};

export const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  const currentState = api.getState() as RootState;
  const refreshToken = currentState.auth.refreshToken;

  let result = await baseQuery(args, api, extraOptions);

  console.log();
  console.log("------------ REQUEST ------------");
  console.log("METHOD: ", result.meta.request.method);
  console.log("URL: ", result.meta.request.url);
  console.log("---------------------------------");
  console.log();
  if (result.error && result.error.status === 401 && refreshToken) {
    console.log("401 SERVER ERROR~~", result.error.status);
    if (!mutex.isLocked()) {
      console.log("... acquiring refresh token");
      const release = await mutex.acquire();
      try {
        console.log("... releasing mutex");
        const { url, method } = endpoints.refreshLocal.getMutationConfig();
        const refreshResult = await baseQuery(
          {
            url,
            method,
            headers: {
              authorization: `Bearer ${refreshToken}`,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const refreshData = refreshResult.data as AuthResponseType;
          api.dispatch(setCredentials(refreshData));
          result = await baseQuery(args, api, extraOptions);
        } else {
          // todo: handle error by logging out user
          console.log("...unable to retrieve refresh token");
        }
      } finally {
        release();
      }
    } else {
      console.log("... waiting for mutex to be unlocked");
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
