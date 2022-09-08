import { cloneDeep } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ServicesType,
  ShortwaitsAdminDefaultDataPayloadType,
} from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../../services";
import type { RootState } from "../../../redux";

export interface MobileAdminStateType {
  defaultData: ShortwaitsAdminDefaultDataPayloadType;
  modals: {
    premiumMembership: {
      isModalOpen: boolean;
    };
  };
}
export const mobileAdminInitialState: MobileAdminStateType = {
  defaultData: null,
  modals: {
    premiumMembership: {
      isModalOpen: false,
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
    setSampleBusinessServicesByIndex(
      state,
      action: PayloadAction<{ data: Partial<ServicesType>; index: number }>
    ) {
      const shortwaitsAdminDefaultData = cloneDeep(state);
      shortwaitsAdminDefaultData.defaultData.sampleBusinessData.services[
        action.payload.index
      ] = action.payload.data;
      return { ...state, defaultData: shortwaitsAdminDefaultData.defaultData };
    },
    hidePremiumMembershipModal(state) {
      return {
        ...state,
        modals: {
          premiumMembership: {
            isModalOpen: !state.modals.premiumMembership.isModalOpen,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      shortwaitsApi.endpoints.getAdminMobile.matchFulfilled,
      (state, action) => {
        return { ...state, defaultData: action.payload.data };
      }
    );
  },
});

export const { setSampleBusinessServicesByIndex, hidePremiumMembershipModal } =
  mobileAdminSlice.actions;

export const selectCurrentMobileAdminState = (state: RootState) =>
  state.mobileAdmin;
