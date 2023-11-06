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
      .addMatcher(shortwaitsApi.endpoints.getLocalClients.matchFulfilled, (state, action) => {
        // merge local clients with existing clients in state by _id
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
    // .addMatcher(shortwaitsApi.endpoints.updateBusinessClient.matchFulfilled, (state, action) => {
    //   const updatedClient = action.payload.data;
    //   const existingClient = state.findIndex(event => event._id === updatedClient._id);
    //   let clients;

    //   if (existingClient !== -1) {
    //     clients = state.map(client => {
    //       if (client._id === updatedClient._id) {
    //         return updatedClient;
    //       }
    //       return client;
    //     });
    //   } else {
    //     clients = state.push(updatedClient);
    //   }
    //   return clients;
    // });
  },
});

export const { setLocalClients } = localClientsSlice.actions;

export const selectCurrentLocalClientsState = (state: RootState) => state.localClients;
