import {
  ServicesType,
  ShortwaitsAdminDefaultDataPayloadType,
} from "@shortwaits/shared-types";
import { api } from "../../services/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../types";
import { cloneDeep } from "lodash";

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
      api.endpoints.getAdminMobile.matchFulfilled,
      (_state, action) => {
        return [...action.payload.data];
      }
    );
  },
});

export const { setSampleBusinessServicesByIndex } = slice.actions;

export default slice.reducer;

export const selectCurrentMobileAdminState = (state: RootState) =>
  state.defaultMobileData;
