import { createSlice } from "@reduxjs/toolkit";
import { ServicesDtoType } from "@shortwaits/shared-lib";
import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

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
    builder.addMatcher(shortwaitsApi.endpoints.getServices.matchFulfilled, (state, action) => {
      return [...action.payload.data];
    });
    builder.addMatcher(shortwaitsApi.endpoints.updateService.matchFulfilled, (_state, action) => {
      return [...action.payload.data.services];
    });
    builder.addMatcher(shortwaitsApi.endpoints.createService.matchFulfilled, (_state, action) => {
      return [...action.payload.data.services];
    });
    builder.addMatcher(shortwaitsApi.endpoints.deleteService.matchFulfilled, (_state, action) => {
      return [...action.payload.data.services];
    });
  },
});

export const { setServices } = servicesSlice.actions;

export const selectCurrentServicesState = (state: RootState) => state.services;
