import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableLanguagesType, languageCode } from "@shortwaits/shared-lib";
import { cloneDeep } from "lodash";
import { Appearance, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

export interface MobileAdminStateType {
  preferredLanguage: AvailableLanguagesType;
  suggestedLanguage: AvailableLanguagesType;
  language: string;
  preferredTheme: string | null;
  suggestedTheme: string | null;
  theme: string | null;
  os: string;
  osVersion: string;
  isTablet: boolean;
  buildNumber?: string;
  appVersion?: string;
}
export const deviceInfoInitialState: MobileAdminStateType = {
  preferredLanguage: null,
  os: Platform.OS,
  osVersion: `${Platform.Version}`,
  language: languageCode,
  suggestedLanguage: "en", // getSupportedDeviceLocale(),
  preferredTheme: null,
  suggestedTheme: null,
  theme: Appearance.getColorScheme() ?? null,
  isTablet: DeviceInfo.isTablet(),
  buildNumber: DeviceInfo.getBuildNumber(),
  appVersion: DeviceInfo.getVersion(),
};
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
