import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenPayloadType } from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../services/shortwaits-api";
import type { RootState } from "../types";

const initialState = {
  token: null,
  refreshToken: null,
};
const slice = createSlice({
  name: "auth",
  initialState: initialState as TokenPayloadType,
  reducers: {
    setCredentials(state, action: PayloadAction<TokenPayloadType>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.auth,
        })
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.auth,
        })
      );
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentAuthState = (state: RootState) => state.auth;
