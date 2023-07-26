import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shortwaitsApi } from "../../../services";
import { UserDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../../types";

const initialState: UserDtoType = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDtoType>) {
      return { ...state, ...action.payload };
    },
    resetUser() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.localSignOut.matchRejected,
        function () {
          console.log(">>> resetting USER state  ");
          return initialState;
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignOut.matchFulfilled,
        function () {
          console.log(">>> resetting USER state  ");
          return initialState;
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        function (state, action) {
          return {
            ...state,
            ...action.payload.data.attributes.currentUser,
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        function (state, action) {
          return {
            ...state,
            ...action.payload.data.attributes.currentUser,
          };
        }
      );
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectCurrentUserState = (state: RootState) => state.user;
