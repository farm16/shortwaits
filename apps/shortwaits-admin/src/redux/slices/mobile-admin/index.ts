import { cloneDeep } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ServicesType,
  ShortwaitsAdminDefaultDataPayloadType,
} from "@shortwaits/shared-types";

import { shortwaitsApi } from "../../../services/shortwaits-api";
import type { RootState } from "../../../redux";

const slice = createSlice({
  name: "defaultMobileData",
  initialState: null as unknown as ShortwaitsAdminDefaultDataPayloadType[],
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
      const shortwaitsAdminDefaultData: ShortwaitsAdminDefaultDataPayloadType[] =
        cloneDeep(state);
      const swDefaultData = shortwaitsAdminDefaultData.map((defaultData) => {
        if (defaultData.short_id === "0000001") {
          defaultData.sampleBusinessData.services[action.payload.index] =
            action.payload.data;
          return defaultData;
        }
        return defaultData;
      });
      return [...swDefaultData];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      shortwaitsApi.endpoints.getAdminMobile.matchFulfilled,
      (_state, action) => {
        return [...action.payload.data];
      }
    );
  },
});

export const { setSampleBusinessServicesByIndex } = slice.actions;

export const mobileAdminReducer = slice.reducer;

export const selectCurrentMobileAdminState = (state: RootState) =>
  state.mobileAdmin;
