import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BusinessDtoType,
  BusinessHoursType,
  BusinessLocationType,
  BusinessWeekDaysType,
  CurrencyType,
  ServiceDtoType,
  ServicesDtoType,
  WeekDayTimeRangeType,
} from "@shortwaits/shared-lib";
import { cloneDeep } from "lodash";
import { shortwaitsApi } from "../../../services";

const initialState: BusinessDtoType | null = null;

export const businessSlice = createSlice({
  name: "business",
  initialState: initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<Partial<BusinessDtoType>>) => {
      return { ...state, ...(action.payload as BusinessDtoType) };
    },
    setBusinessShortName(state, action: PayloadAction<{ shortName: string }>) {
      return { ...state, ...action.payload };
    },
    setBusinessDescription(state, action: PayloadAction<{ description: string }>) {
      return { ...state, ...action.payload };
    },
    setBusinessCurrency(state, action: PayloadAction<{ currency: CurrencyType }>) {
      return { ...state, ...action.payload };
    },
    setBusinessCountry(state, action: PayloadAction<{ country: string }>) {
      return { ...state, ...action.payload };
    },
    setBusinessPhone1(state, action: PayloadAction<{ phone1: string }>) {
      return { ...state, ...action.payload };
    },
    setBusinessCategory(state, action: PayloadAction<string>) {
      const newCategory = action.payload;
      const updatedCategories = state.categories.filter(category => category !== newCategory); // Remove the new category if it already exists in the state

      const categories = [...updatedCategories, newCategory]; // Add the new category to the existing unique categories

      console.log("categories >>>", categories);
      return { ...state, categories };
    },
    setBusinessCategories(state, action: PayloadAction<string[]>) {
      console.log("action.payload >>>", action.payload);
      const uniquePayloadCategories = [...new Set(action.payload)]; // Remove duplicates from the incoming array
      const categories = [...uniquePayloadCategories]; // Combine the updated and unique categories

      return { ...state, categories };
    },
    setBusinessUser(state, action: PayloadAction<string>) {
      if (state.staff.includes(action.payload)) {
        const staff = state.staff.filter(elem => elem !== action.payload);
        console.log("removing >>>", staff);
        return { ...state, staff };
      } else {
        const staff = [...state.staff, action.payload];
        console.log("adding >>>", staff);
        return { ...state, staff };
      }
    },
    setBusinessWeekSchedule(state, action: PayloadAction<BusinessHoursType>) {
      return { ...state, ...action.payload };
    },
    setBusinessDaySchedule(
      state,
      action: PayloadAction<{
        data: WeekDayTimeRangeType;
        day: BusinessWeekDaysType;
      }>
    ) {
      const days = state.hours;
      days[action.payload.day][0] = action.payload.data;
      return { ...state, ...days };
    },
    /**
     * @todo
     * We are only supporting 1 set of time range in a day ** **FOR NOW
     */
    setBusinessDayActivity(state, action: PayloadAction<BusinessWeekDaysType>) {
      const day = action.payload;
      const hours = cloneDeep(state.hours);
      hours[day][0].isActive = !state.hours[day][0].isActive;

      return { ...state, hours };
    },
    /**
     * return hours with active/inactive hours
     */
    setBusinessAllHours(state, action: PayloadAction<boolean>) {
      const clonedHours = cloneDeep(state.hours);
      const days = Object.keys(clonedHours);

      days.forEach(day => {
        clonedHours[day][0].isActive = action.payload;
      });

      return { ...state, hours: clonedHours };
    },
    /**
     * sets hours in a day
     */
    setBusinessDayHours(
      state,
      action: PayloadAction<{
        values: [number, number];
        name: BusinessWeekDaysType;
      }>
    ) {
      const newHours = {
        ...state.hours[action.payload.name][0],
        startTime: action.payload.values[0],
        endTime: action.payload.values[1],
      };
      return {
        ...state,
        hours: { ...state.hours, [action.payload.name]: [newHours] },
      };
    },
    setBusinessLocation(state, action: PayloadAction<{ location: BusinessLocationType }>) {
      return { ...state, ...action.payload };
    },
    setBusinessIsRegistrationCompleted(state, action: PayloadAction<{ isRegistrationCompleted: boolean }>) {
      return { ...state, ...action.payload };
    },
    setBusinessDeleted(state, action: PayloadAction<{ deleted: boolean }>) {
      return { ...state, ...action.payload };
    },

    setBusinessServicesFromDefault(state, action: PayloadAction<ServicesDtoType>) {
      if (state?.services.length === 0 && !state.isRegistrationCompleted) {
        const defaultServices = action.payload.map((defaultService, index) => {
          return { ...defaultService, _id: `__DEFAULT__SERVICE__${index}__` };
        });
        return { ...state, service: defaultServices };
      } else {
        return state;
      }
    },
    setBusinessServices(state, action: PayloadAction<ServicesDtoType>) {
      return { ...state, service: action.payload };
    },
    setBusinessService(state, action: PayloadAction<ServiceDtoType>) {
      const newBusinessService = [...state.services, action.payload];

      return { ...state, service: newBusinessService };
    },
    resetBusiness() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(shortwaitsApi.endpoints.localSignOut.matchRejected, function () {
        console.log(">>> resetting USER state  ");
        return initialState;
      })
      .addMatcher(shortwaitsApi.endpoints.localSignOut.matchFulfilled, function () {
        return initialState;
      })
      .addMatcher(shortwaitsApi.endpoints.registerBusiness.matchFulfilled, (state, action) => ({
        ...state,
        ...action.payload.data,
      }))
      .addMatcher(shortwaitsApi.endpoints.getBusiness.matchFulfilled, (state, action) => ({
        ...state,
        ...action.payload.data,
      }))
      .addMatcher(shortwaitsApi.endpoints.localSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentBusinessAccounts[0],
        };
      })
      .addMatcher(shortwaitsApi.endpoints.localSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentBusinessAccounts[0],
        };
      })
      .addMatcher(shortwaitsApi.endpoints.socialSignUp.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentBusinessAccounts[0],
        };
      })
      .addMatcher(shortwaitsApi.endpoints.socialSignIn.matchFulfilled, function (state, action) {
        return {
          ...state,
          ...action.payload.data.attributes.currentBusinessAccounts[0],
        };
      })
      .addMatcher(shortwaitsApi.endpoints.updateBusiness.matchFulfilled, function (state, action) {
        console.log(">>> updateBusiness - BUSINESS SLICE", action.payload.data);
        return {
          ...state,
          ...action.payload.data,
        };
      });
  },
});
