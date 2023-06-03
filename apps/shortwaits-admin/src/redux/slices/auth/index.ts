import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenPayloadType } from "@shortwaits/shared-types";

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
    setCredentials(state, action: PayloadAction<TokenPayloadType>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetAuth() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignIn - AUTH ");
          return {
            ...state,
            ...action.payload.data.auth,
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignUp - AUTH ", {
            ...state,
            ...action.payload.data.auth,
          });
          return {
            ...state,
            ...action.payload.data.auth,
          };
        }
      );
  },
});

export const { setCredentials, resetAuth } = authSlice.actions;

export const selectCurrentAuthState = (state: RootState) => state.auth;