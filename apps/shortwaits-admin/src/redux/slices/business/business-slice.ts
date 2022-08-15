/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessPayloadType } from "@shortwaits/shared-types";
import { shortwaitsApi } from "../../../services/shortwaits-api";
import { businessReducers } from "./business-reducers";
import { isEmpty } from "lodash";

const initialState: BusinessPayloadType = null;

export const businessSlice = createSlice({
  name: "business",
  initialState: initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<BusinessPayloadType>) => ({
      ...state,
      ...action.payload,
    }),
    ...businessReducers,
    resetBusiness() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * this happens when user signs up
       */
      // .addMatcher(
      //   shortwaitsApi.endpoints.postBusinessRegistration.matchFulfilled,
      //   (state, action) => ({
      //     ...state,
      //     ...action.payload.data.business,
      //   })
      // )
      .addMatcher(
        shortwaitsApi.endpoints.getBusiness.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignUp.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignUp - BUSINESS ", {
            ...state,
            ...action.payload.attributes.currentBusinessAccounts,
          });
          return {
            ...state,
            ...action.payload.attributes.currentBusinessAccounts[0],
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignIn - BUSINESS ", {
            ...state,
            ...action.payload.attributes.currentBusinessAccounts,
          });
          return {
            ...state,
            ...action.payload.attributes.currentBusinessAccounts[0],
          };
        }
      );
  },
});
