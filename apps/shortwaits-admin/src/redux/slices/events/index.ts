import { createSlice } from "@reduxjs/toolkit";
import { EventDocType } from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../../../redux";

export const eventsInitialState: EventDocType[] = null;
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
      shortwaitsApi.endpoints.getAllBusinessEvents.matchFulfilled,
      (state, action) => {
        return [...action.payload.data.events];
      }
    );
  },
});

export const { setEvents } = eventsSlice.actions;

export const selectCurrentEventsState = (state: RootState) => state.events;
