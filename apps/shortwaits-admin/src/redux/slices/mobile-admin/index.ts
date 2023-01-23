import { cloneDeep } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoriesPayloadType,
  ShortwaitsAdminDefaultDataPayloadType,
} from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../../../redux";

export interface MobileAdminStateType {
  defaultData: ShortwaitsAdminDefaultDataPayloadType;
  categories: CategoriesPayloadType[];
  components: {
    premiumMembership: {
      isVisible: boolean;
    };
    floatingActionButton: {
      isVisible: boolean;
    };
  };
}
export const mobileAdminInitialState: MobileAdminStateType = {
  defaultData: null,
  categories: null,
  components: {
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
    changeFloatingActionButtonVisibility(
      state,
      action: PayloadAction<boolean>
    ) {
      const { payload } = action;
      const currentState = cloneDeep(state);
      return {
        ...currentState,
        components: {
          ...currentState.components,
          floatingActionButton: {
            isVisible: payload
              ? payload
              : !currentState.components.floatingActionButton.isVisible,
          },
        },
      };
    },
    changePremiumMembershipModalVisibility(
      state,
      action: PayloadAction<boolean>
    ) {
      const { payload } = action;

      return {
        ...state,
        components: {
          ...state.components,
          premiumMembership: {
            isVisible: payload
              ? payload
              : !state.components.premiumMembership.isVisible,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.getAdminMobile.matchFulfilled,
        (state, action) => {
          return { ...state, defaultData: action.payload.data };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.getCategories.matchFulfilled,
        (state, action) => {
          return { ...state, categories: action.payload.data };
        }
      );
  },
});

export const {
  changePremiumMembershipModalVisibility,
  changeFloatingActionButtonVisibility,
} = mobileAdminSlice.actions;

export const selectCurrentMobileAdminState = (state: RootState) =>
  state.mobileAdmin;
