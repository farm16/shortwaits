import { createSlice } from "@reduxjs/toolkit";
import { ClientUsersDtoType } from "@shortwaits/shared-lib";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../..";

export const clientsInitialState: ClientUsersDtoType = null;
export const clientsSlice = createSlice({
  name: "clients",
  initialState: clientsInitialState,
  reducers: {
    setClients(state) {
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

export const { setClients } = clientsSlice.actions;

export const selectCurrentClientsState = (state: RootState) => state.clients;
