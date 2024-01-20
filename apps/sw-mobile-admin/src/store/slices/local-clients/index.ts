import { createSlice } from "@reduxjs/toolkit";
import { LocalClientsDtoType } from "@shortwaits/shared-utils";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const localClientsInitialState: LocalClientsDtoType = null;
export const localClientsSlice = createSlice({
  name: "localClients",
  initialState: localClientsInitialState,
  reducers: {
    setLocalClients(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.getLocalClients.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessLocalClients.matchFulfilled, (_state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.getAllBusinessClients.matchFulfilled, (_state, action) => {
        return action.payload.data.localClients;
      })
      .addMatcher(shortwaitsApi.endpoints.createLocalClients.matchFulfilled, (state, action) => {
        return action.payload.data.localClientUsers;
      });
  },
});

export const { setLocalClients } = localClientsSlice.actions;

export const selectCurrentLocalClientsState = (state: RootState) => state.localClients;
