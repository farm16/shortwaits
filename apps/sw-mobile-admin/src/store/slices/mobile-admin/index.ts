import { cloneDeep } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesDtoType, ShortwaitsAdminDefaultDataPayloadType } from "@shortwaits/shared-lib";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../..";

type GhostComponentProps = {
  [key: string]: string | boolean;
  isVisible: boolean;
};
export interface MobileAdminStateType {
  defaultData: ShortwaitsAdminDefaultDataPayloadType;
  categories: CategoriesDtoType;
  components: {
    banner: GhostComponentProps;
    premiumMembership: GhostComponentProps;
    floatingActionButton: GhostComponentProps;
  };
}
export const mobileAdminInitialState: MobileAdminStateType = {
  defaultData: null,
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
    /**
     * @param action.payload: ServicesType and
     * updates by index since_id is not defined
     * on sample services.
     */
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
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.getAdminMobile.matchFulfilled, (state, action) => {
        return { ...state, defaultData: action.payload.data };
      })
      .addMatcher(shortwaitsApi.endpoints.getCategories.matchFulfilled, (state, action) => {
        return { ...state, categories: action.payload.data };
      });
  },
});

export const {
  showPremiumMembershipBanner,
  hidePremiumMembershipBanner,
  hidePremiumMembershipModal,
  showPremiumMembershipModal,
  changeFloatingActionButtonVisibility,
} = mobileAdminSlice.actions;

export const selectCurrentMobileAdminState = (state: RootState) => state.mobileAdmin;
