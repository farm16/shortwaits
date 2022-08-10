import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shortwaitsApi } from "../../../services/shortwaits-api";
import { UserPayloadType } from "@shortwaits/shared-types";

import type { RootState } from "../../types";

const initialState = null;

const slice = createSlice({
  name: "user",
  initialState: initialState as UserPayloadType,
  reducers: {
    setUser(state, action: PayloadAction<UserPayloadType>) {
      return { ...state, ...action.payload };
    },
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
      .addMatcher(
        shortwaitsApi.endpoints.postBusinessRegistration.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data.user,
        })
      );
  },
});

export const { setUser, resetUser } = slice.actions;

export const userReducer = slice.reducer;

export const selectCurrentUserState = (state: RootState) => state.user;
