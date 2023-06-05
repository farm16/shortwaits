import { createSlice } from "@reduxjs/toolkit";
import { ServicesDtoType } from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../../../redux";

export const servicesInitialState: ServicesDtoType = null;
export const servicesSlice = createSlice({
  name: "services",
  initialState: servicesInitialState,
  reducers: {
    setServices(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      shortwaitsApi.endpoints.getServicesByBusiness.matchFulfilled,
      (state, action) => {
        return [...action.payload.data];
      }
    );
  },
});

export const { setServices } = servicesSlice.actions;

export const selectCurrentServicesState = (state: RootState) => state.services;
