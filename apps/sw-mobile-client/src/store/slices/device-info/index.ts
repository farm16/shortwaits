import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableLanguagesType } from "@shortwaits/shared-lib";
import { deviceInfoInitialState } from "@shortwaits/shared-mobile";
import { cloneDeep } from "lodash";
import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export const deviceInfoSlice = createSlice({
  name: "deviceInfo",
  initialState: deviceInfoInitialState,
  reducers: {
    setPreferredTheme(state, action) {
      console.log("setPreferredTheme Action >>>", action);
    },
    updatePreferredLanguage(state, action: PayloadAction<AvailableLanguagesType>) {
      const { payload } = action;
      const currentState = cloneDeep(state);
      console.log("updatePreferredLanguage Action >>>", payload);
      return {
        ...currentState,
        preferredLanguage: payload,
      };
    },
    updateSuggestedLanguage(state, action: PayloadAction<AvailableLanguagesType>) {
      const { payload } = action;
      const currentState = cloneDeep(state);
      console.log("updateSuggestedLanguage Action >>>", payload);
      return {
        ...currentState,
        suggestedLanguage: payload,
      };
    },
    resetDeviceInfo() {
      return deviceInfoInitialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(shortwaitsApi.endpoints.localSignOut.matchFulfilled, function () {
      console.log(">>> resetting Device Info state");
      return deviceInfoInitialState;
    });
  },
});

export const { setPreferredTheme, updatePreferredLanguage, updateSuggestedLanguage, resetDeviceInfo } = deviceInfoSlice.actions;

export const selectCurrentDeviceInfo = (state: RootState) => state.deviceInfo;
