import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortwaitsAdminDefaultDataPayloadType } from "@shortwaits/shared-lib";
import { cloneDeep } from "lodash";
import type { RootState } from "../..";
import { shortwaitsApi } from "../../../services";

type GhostComponentProps = {
  [key: string]: string | boolean;
  isVisible: boolean;
};

export interface ShortwaitsStateType {
  shortwaits: ShortwaitsAdminDefaultDataPayloadType | null;
  components: {
    banner: GhostComponentProps;
    premiumMembership: GhostComponentProps;
    floatingActionButton: GhostComponentProps;
  };
}
export const shortwaitsInitialState: ShortwaitsStateType = {
  shortwaits: null,
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

export const shortwaitsSlice = createSlice({
  name: "shortwaits",
  initialState: shortwaitsInitialState,
  reducers: {
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
    resetShortwaits() {
      return shortwaitsInitialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(shortwaitsApi.endpoints.getAdminMobile.matchFulfilled, (state, action) => {
      return { ...state, shortwaits: action.payload.data };
    });
  },
});

export const {
  changeFloatingActionButtonVisibility,
  showPremiumMembershipModal,
  hidePremiumMembershipModal,
  showPremiumMembershipBanner,
  hidePremiumMembershipBanner,
  resetShortwaits,
} = shortwaitsSlice.actions;

export const selectCurrentShortwaits = (state: RootState) => state.shortwaits;
