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
    builder
      .addMatcher(shortwaitsApi.endpoints.getStaff.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.getBusinessStaff.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessStaff.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.updateBusinessStaff.matchFulfilled, (state, action) => {
        const updatedStaff = action.payload.data;
        return state.map(staff => {
          if (staff._id === updatedStaff._id) {
            return updatedStaff;
          }
          return staff;
        });
      })
      .addMatcher(shortwaitsApi.endpoints.deleteBusinessStaff.matchFulfilled, (state, action) => {
        return action.payload.data;
      });
  },
});

export const { setStaff } = staffSlice.actions;

export const selectCurrentStaffState = (state: RootState) => state.staff;
