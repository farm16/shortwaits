/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessPayloadType } from "@shortwaits/shared-types";
import { api } from "@/services/api";
import { businessReducers } from "./business-reducers";
import { isEmpty } from "lodash";

export const BusinessSlice = createSlice({
  name: "business",
  initialState: null as unknown as BusinessPayloadType,
  reducers: {
    setBusiness: (state, action: PayloadAction<BusinessPayloadType>) => ({
      ...state,
      ...action.payload,
    }),
    ...businessReducers,
  },
  extraReducers: (builder) => {
    builder
      /**
       * this happens when user signs up
       */
      .addMatcher(api.endpoints.localSignUp.matchFulfilled, (state, action) => {
        if (isEmpty(state.staff) && !state.isRegistrationCompleted) {
          const staff = [action.payload.data._id];
          return { ...state, staff };
        } else {
          return state;
        }
      })
      .addMatcher(
        api.endpoints.postBusinessRegistration.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data.business,
        })
      )
      .addMatcher(
        api.endpoints.getAdminMobile.matchFulfilled,
        (state, action) => {
          const { sampleBusinessData } = action.payload.data[0];
          if (state && state.isRegistrationCompleted) {
            return state;
          } else {
            const payload: Pick<
              BusinessPayloadType,
              "currency" | "isRegistrationCompleted" | "hours" | "categories"
            > = {
              currency: sampleBusinessData.currencies.find(
                (category) => category.code === "USD"
              ) ?? {
                name: "",
                code: "",
                symbol: "",
                codeNumber: 0,
                decimalSeparator: 0,
              },
              isRegistrationCompleted: false,
              hours: sampleBusinessData.hours,
              categories: sampleBusinessData.categories,
            };
            return {
              ...state,
              ...payload,
            };
          }
        }
      )
      .addMatcher(
        api.endpoints.getBusiness.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      );
  },
});
