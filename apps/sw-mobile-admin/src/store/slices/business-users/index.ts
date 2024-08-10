import { createSlice } from "@reduxjs/toolkit";
import { BusinessUsersDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const businessUsersInitialState: BusinessUsersDtoType = null;

export const businessUsersSlice = createSlice({
  name: "businessUsers",
  initialState: businessUsersInitialState,
  reducers: {
    setBusinessUsers(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.getBusinessUsers.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessUser.matchFulfilled, (state, action) => {
        return action.payload.data.businessUsers;
      })
      .addMatcher(shortwaitsApi.endpoints.updateBusinessUser.matchFulfilled, (state, action) => {
        const businessUsersPayloadData = action.payload.data;
        return state.map(businessUser => {
          if (businessUser._id === businessUsersPayloadData._id) {
            return businessUsersPayloadData;
          }
          return businessUser;
        });
      })
      .addMatcher(shortwaitsApi.endpoints.deleteBusinessUser.matchFulfilled, (state, action) => {
        return action.payload.data;
      });
  },
});

export const { setBusinessUsers } = businessUsersSlice.actions;

export const selectCurrentBusinessUsersState = (state: RootState) => state.businessUsers;
