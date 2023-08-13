import { createSlice } from "@reduxjs/toolkit";
import { EventsDtoType } from "@shortwaits/shared-lib";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../..";

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
    builder.addMatcher(
      shortwaitsApi.endpoints.getEventsByBusiness.matchFulfilled,
      (_state, action) => {
        return [...action.payload.data];
      }
    );
  },
});

export const { setEvents } = eventsSlice.actions;

export const selectCurrentEventsState = (state: RootState) => state.events;