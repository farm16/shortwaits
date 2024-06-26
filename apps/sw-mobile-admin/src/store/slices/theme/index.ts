import { createSlice } from "@reduxjs/toolkit";
import { ThemePayload, ThemeState } from "../../types";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: null, darkMode: null } as ThemeState,
  reducers: {
    changeTheme(state, { payload: { theme, darkMode } }: ThemePayload) {
      if (typeof theme !== "undefined") {
        state.theme = theme;
      }
      if (typeof darkMode !== "undefined") {
        state.darkMode = darkMode;
      }
    },
    setDefaultTheme(state, { payload: { theme, darkMode } }: ThemePayload) {
      if (!state.theme) {
        state.theme = theme;
        state.darkMode = darkMode;
      }
    },
  },
});

export const { changeTheme, setDefaultTheme } = themeSlice.actions;
