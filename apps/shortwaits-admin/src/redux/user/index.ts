import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@shortwaits/admin/services/api";
import { UserPayloadType } from "@shortwaits/shared-types";

import type { RootState } from "../types";

const slice = createSlice({
  name: "user",
  initialState: null as unknown as UserPayloadType,
  reducers: {
    setUser(state, action: PayloadAction<UserPayloadType>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.localSignIn.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
      .addMatcher(
        api.endpoints.localSignUp.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
      .addMatcher(
        api.endpoints.postBusinessRegistration.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data.user,
        })
      );
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUserState = (state: RootState) => state.user;
