import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseType, TokenPayloadType } from "@shortwaits/shared-lib";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../../types";

const initialState: TokenPayloadType = {
  token: null,
  refreshToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponseType>) {
      console.log(">>> setting credentials  ");
      return {
        ...state,
        ...action.payload.data.auth,
      };
    },
    resetAuth() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.localSignOut.matchRejected, function () {
        console.log(">>> resetting USER state  ");
        return initialState;
      })
      .addMatcher(shortwaitsApi.endpoints.localSignOut.matchFulfilled, function () {
        console.log(">>> resetting AUTH state  ");
        return initialState;
      })
      .addMatcher(shortwaitsApi.endpoints.socialSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.auth,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.socialSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.auth,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.localSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.auth,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.localSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.auth,
        };
      });
  },
});

export const { setCredentials, resetAuth } = authSlice.actions;

export const selectCurrentAuthState = (state: RootState) => state.auth;
