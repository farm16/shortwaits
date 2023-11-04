import { createSlice } from "@reduxjs/toolkit";
import { ClientUsersDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const localClientsInitialState: ClientUsersDtoType = null;
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
      .addMatcher(shortwaitsApi.endpoints.getBusinessClients.matchFulfilled, (_state, action) => {
        return [...action.payload.data];
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessClients.matchFulfilled, (_state, action) => {
        return [...action.payload.data];
      })
      .addMatcher(shortwaitsApi.endpoints.updateBusinessClient.matchFulfilled, (state, action) => {
        const updatedClient = action.payload.data;
        const existingClient = state.findIndex(event => event._id === updatedClient._id);
        let clients;

        if (existingClient !== -1) {
          clients = state.map(client => {
            if (client._id === updatedClient._id) {
              return updatedClient;
            }
            return client;
          });
        } else {
          clients = state.push(updatedClient);
        }
        return clients;
      });
  },
});

export const { setLocalClients } = localClientsSlice.actions;

export const selectCurrentLocalClientsState = (state: RootState) => state.localClients;
