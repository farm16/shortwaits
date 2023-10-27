import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import { shortwaitsApi } from "../../../services";

import type { RootState } from "../../types";

const initialState: BusinessUserDtoType = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<BusinessUserDtoType>) {
      return { ...state, ...action.payload };
    },
    resetUser() {
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
        console.log(">>> resetting USER state  ");
        return initialState;
      })
      .addMatcher(shortwaitsApi.endpoints.localSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentUser,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.localSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentUser,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.socialSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentUser,
        };
      })
      .addMatcher(shortwaitsApi.endpoints.businessSocialSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentUser,
        };
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectCurrentUserState = (state: RootState) => state.user;
