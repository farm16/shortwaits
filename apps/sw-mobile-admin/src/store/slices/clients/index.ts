import { createSlice } from "@reduxjs/toolkit";
import { ClientsDtoType } from "@shortwaits/shared-lib";
import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const clientsInitialState: ClientsDtoType = null;
export const clientsSlice = createSlice({
  name: "clients",
  initialState: clientsInitialState,
  reducers: {
    setClients(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(shortwaitsApi.endpoints.getAllBusinessClients.matchFulfilled, (_state, action) => {
      return action.payload.data.clients;
    });
  },
});

export const { setClients } = clientsSlice.actions;

export const selectCurrentClientsState = (state: RootState) => state.clients;
