import { createSlice } from "@reduxjs/toolkit";
import { BusinessUsersDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const staffInitialState: BusinessUsersDtoType = null;
export const staffSlice = createSlice({
  name: "staff",
  initialState: staffInitialState,
  reducers: {
    setStaff(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(shortwaitsApi.endpoints.getBusinessStaff.matchFulfilled, (state, action) => {
      return [...action.payload.data];
    });
    // .addMatcher(shortwaitsApi.endpoints.getPeopleInEvent.matchFulfilled, (state, action) => {
    //   return [...state, ...action.payload.data.businessUsers];
    // });
  },
});

export const { setStaff } = staffSlice.actions;

export const selectCurrentStaffState = (state: RootState) => state.staff;
