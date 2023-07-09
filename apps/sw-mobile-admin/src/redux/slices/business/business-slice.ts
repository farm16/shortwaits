import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessDtoType } from "@shortwaits/shared-types";
import { shortwaitsApi } from "../../../services";
import { businessReducers } from "./business-reducers";

const initialState: BusinessDtoType = null;

export const businessSlice = createSlice({
  name: "business",
  initialState: initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<BusinessDtoType>) => ({
      ...state,
      ...action.payload,
    }),
    ...businessReducers,
    resetBusiness() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        shortwaitsApi.endpoints.localSignOut.matchRejected,
        function () {
          console.log(">>> resetting USER state  ");
          return initialState;
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignOut.matchFulfilled,
        function () {
          return initialState;
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.registerBusiness.matchFulfilled,
        (state, action) => ({
          ...state,
          ...action.payload.data,
        })
      )
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
            ...action.payload.data.attributes.currentBusinessAccounts,
          });
          return {
            ...state,
            ...action.payload.data.attributes.currentBusinessAccounts[0],
          };
        }
      )
      .addMatcher(
        shortwaitsApi.endpoints.localSignIn.matchFulfilled,
        function (state, action) {
          console.log(">>> localSignIn - BUSINESS ", {
            ...state,
            ...action.payload.data.attributes.currentBusinessAccounts,
          });
          return {
            ...state,
            ...action.payload.data.attributes.currentBusinessAccounts[0],
          };
        }
      );
  },
});
