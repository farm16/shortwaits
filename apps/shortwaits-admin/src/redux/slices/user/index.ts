import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shortwaitsApi } from "../../../services/shortwaits-api";
import { UserPayloadType } from "@shortwaits/shared-types";

import type { RootState } from "../../types";

const initialState: UserPayloadType = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
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
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignUp - USER ", {
            ...state,
            ...action.payload.attributes.currentUser,
          });
          return {
            ...state,
            ...action.payload.attributes.currentUser,
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignIn - USER ", {
            ...state,
            ...action.payload.attributes.currentUser,
          });
          return {
            ...state,
            ...action.payload.attributes.currentUser,
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.postBusinessRegistration.matchFulfilled,
        function (state, action) {
          return {
            ...state,
            ...action.payload.data,
          };
        }
      );
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectCurrentUserState = (state: RootState) => state.user;
