import { createSlice } from "@reduxjs/toolkit";
import { LocalClientUsersDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const localClientsInitialState: LocalClientUsersDtoType = null;
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
        // merge local clients with existing clients in state by _id
        if (state === null) {
          return action.payload.data;
        }
        const newClients = action.payload.data;
        const existingClients = state;
        const mergedClients = newClients.map(newClient => {
          const existingClient = existingClients.find(existingClient => existingClient._id === newClient._id);
          if (existingClient) {
            return existingClient;
          }
          return newClient;
        });
        return mergedClients;
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessLocalClients.matchFulfilled, (_state, action) => {
        return [...new Set([..._state, ...action.payload.data])];
      })
      .addMatcher(shortwaitsApi.endpoints.getAllBusinessClients.matchFulfilled, (_state, action) => {
        return [...new Set([..._state, ...action.payload.data.localClients])];
      })
      .addMatcher(shortwaitsApi.endpoints.createLocalClients.matchFulfilled, (state, action) => {
        const newClients = action.payload.data.localClientUsers;
        const existingClients = state;
        const mergedClients = newClients.map(newClient => {
          const existingClient = existingClients.find(existingClient => existingClient._id === newClient._id);
          if (existingClient) {
            return existingClient;
          }
          return newClient;
        });
        return mergedClients;
      });
  },
});

export const { setLocalClients } = localClientsSlice.actions;

export const selectCurrentLocalClientsState = (state: RootState) => state.localClients;
