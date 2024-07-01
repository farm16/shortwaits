import { createSlice } from "@reduxjs/toolkit";
import { LocalClientsDtoType } from "@shortwaits/shared-lib";
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
      .addMatcher(shortwaitsApi.endpoints.updateBusinessLocalClient.matchFulfilled, (_state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessLocalClients.matchFulfilled, (_state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.deleteBusinessLocalClients.matchFulfilled, (state, action) => {
        return action.payload.data;
      })
      .addMatcher(shortwaitsApi.endpoints.getAllBusinessClients.matchFulfilled, (_state, action) => {
        return action.payload.data.localClients;
      });
  },
});

export const { setLocalClients } = localClientsSlice.actions;

export const selectCurrentLocalClientsState = (state: RootState) => state.localClients;
