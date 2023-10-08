import { cloneDeep } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AvailableLanguagesType,
  CategoriesDtoType,
  ShortwaitsAdminDefaultDataPayloadType,
} from "@shortwaits/shared-lib";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../..";
import { Platform } from "react-native";
import { getSupportedLanguageCode, languageCode } from "../../../utils";

type GhostComponentProps = {
  [key: string]: string | boolean;
  isVisible: boolean;
};

export interface MobileAdminStateType {
  preferredLanguage: AvailableLanguagesType;
  suggestedLanguage: AvailableLanguagesType;
  deviceInfo: {
    os: string;
    osVersion: string;
    language: string;
  };
  shortwaits: ShortwaitsAdminDefaultDataPayloadType;
  categories: CategoriesDtoType;
  components: {
    banner: GhostComponentProps;
    premiumMembership: GhostComponentProps;
    floatingActionButton: GhostComponentProps;
  };
}
export const mobileAdminInitialState: MobileAdminStateType = {
  preferredLanguage: null,
  deviceInfo: {
    os: Platform.OS,
    osVersion: `${Platform.Version}`,
    language: languageCode,
  },
  suggestedLanguage: getSupportedLanguageCode(),
  shortwaits: null,
  categories: null,
  components: {
    banner: {
      name: "",
      isVisible: false,
    },
    floatingActionButton: {
      isVisible: false,
    },
    premiumMembership: {
      isVisible: false,
    },
  },
};
export const mobileAdminSlice = createSlice({
  name: "mobileAdmin",
  initialState: mobileAdminInitialState,
  reducers: {
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
    changeFloatingActionButtonVisibility(state, action: PayloadAction<boolean>) {
      const { payload } = action;
      const currentState = cloneDeep(state);
      console.log("changeFloatingActionButtonVisibility Action >>>", payload);
      return {
        ...currentState,
        components: {
          ...currentState.components,
          floatingActionButton: {
            isVisible: payload ? payload : !currentState.components.floatingActionButton.isVisible,
          },
        },
      };
    },
    showPremiumMembershipModal(state) {
      return {
        ...state,
        components: {
          ...state.components,
          premiumMembership: {
            isVisible: true,
          },
        },
      };
    },
    hidePremiumMembershipModal(state) {
      return {
        ...state,
        components: {
          ...state.components,
          premiumMembership: {
            isVisible: false,
          },
        },
      };
    },
    showPremiumMembershipBanner(state) {
      return {
        ...state,
        components: {
          ...state.components,
          banner: {
            name: "premium-membership",
            isVisible: true,
          },
        },
      };
    },
    hidePremiumMembershipBanner(state) {
      return {
        ...state,
        components: {
          ...state.components,
          banner: {
            name: "",
            isVisible: false,
          },
        },
      };
    },
    resetMobileAdmin() {
      return mobileAdminInitialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(shortwaitsApi.endpoints.getAdminMobile.matchFulfilled, (state, action) => {
      return { ...state, shortwaits: action.payload.data };
    });
  },
});

export const {
  showPremiumMembershipBanner,
  hidePremiumMembershipBanner,
  hidePremiumMembershipModal,
  showPremiumMembershipModal,
  changeFloatingActionButtonVisibility,
  updatePreferredLanguage,
  updateSuggestedLanguage,
  resetMobileAdmin,
} = mobileAdminSlice.actions;

export const selectCurrentMobileAdminState = (state: RootState) => state.mobileAdmin;
