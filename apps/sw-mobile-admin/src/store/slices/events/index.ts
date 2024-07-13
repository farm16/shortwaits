import { createSlice } from "@reduxjs/toolkit";
import { EventsDtoType } from "@shortwaits/shared-lib";

import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const eventsInitialState: EventsDtoType = null;

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsInitialState,
  reducers: {
    setEvents(state) {
      return [...state];
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.getBusinessEvents.matchFulfilled, (_state, action) => {
        return [...action.payload.data];
      })
      .addMatcher(shortwaitsApi.endpoints.createBusinessEvent.matchFulfilled, (state, action) => {
        const updatedEvent = action.payload.data;
        const existingEventIndex = state.findIndex(event => event._id === updatedEvent._id);
        const newState = [...state];

        if (existingEventIndex !== -1) {
          // If the event exists, update it in the new state array
          newState[existingEventIndex] = updatedEvent;
        } else {
          // If the event doesn't exist, add it to the new state array
          newState.push(updatedEvent);
        }
        return newState;
      })
      .addMatcher(shortwaitsApi.endpoints.updateBusinessEvent.matchFulfilled, (state, action) => {
        const updatedEvent = action.payload.data;
        const existingEventIndex = state.findIndex(event => event._id === updatedEvent._id);
        const newState = [...state];

        if (existingEventIndex !== -1) {
          // If the event exists, update it in the new state array
          newState[existingEventIndex] = updatedEvent;
        } else {
          // If the event doesn't exist, add it to the new state array
          newState.push(updatedEvent);
        }
        return newState;
      });
  },
});

export const { setEvents } = eventsSlice.actions;

export const selectCurrentEventsState = (state: RootState) => state.events;
