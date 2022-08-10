import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import {
  CategoriesPayloadType,
  BusinessDayTimeRangeType,
  BusinessHoursType,
  BusinessLocationType,
  BusinessWeekDaysType,
  DocType,
  ServicesType,
  ServicesPayloadType,
  CurrencyType,
  BusinessPayloadType,
  BusinessType,
  ObjectId,
} from "@shortwaits/shared-types";
import { cloneDeep } from "lodash";

export const businessReducers = {
  setBusinessShortName(
    state: BusinessPayloadType,
    action: PayloadAction<{ shortName: string }>
  ) {
    return { ...state, ...action.payload };
  },
  setBusinessDescription(
    state,
    action: PayloadAction<{ description: string }>
  ) {
    return { ...state, ...action.payload };
  },
  setBusinessCurrency(
    state,
    action: PayloadAction<{ currency: CurrencyType }>
  ) {
    return { ...state, ...action.payload };
  },
  setBusinessCountry(state, action: PayloadAction<{ country: string }>) {
    return { ...state, ...action.payload };
  },
  setBusinessPhone1(state, action: PayloadAction<{ phone1: string }>) {
    return { ...state, ...action.payload };
  },
  setBusinessCategory(state, action: PayloadAction<CategoriesPayloadType>) {
    if (
      state.categories.some((category) => category._id === action.payload._id)
    ) {
      const categories = state.categories.filter((category) => {
        return category._id !== action.payload._id;
      });
      return { ...state, categories };
    } else {
      const categories = [...state.categories, action.payload];
      return { ...state, categories };
    }
  },
  setBusinessCategories(
    state: BusinessPayloadType,
    action: PayloadAction<ObjectId>
  ) {
    if (state.categories.includes(action.payload)) {
      const categories = state.categories.filter(
        (elem) => elem !== action.payload
      );
      console.log("removing >>>", categories);
      return { ...state, categories };
    } else {
      const categories = [...state.categories, action.payload];
      console.log("adding >>>", categories);
      return { ...state, categories };
    }
  },
  setBusinessStaff(
    state: BusinessPayloadType,
    action: PayloadAction<ObjectId>
  ) {
    if (state.staff.includes(action.payload)) {
      const staff = state.staff.filter((elem) => elem !== action.payload);
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
      data: BusinessDayTimeRangeType[];
      day: BusinessWeekDaysType;
    }>
  ) {
    if (!state) return state;
    const days = state.hours;
    days[action.payload.day] = action.payload.data;
    return { ...state, ...days };
  },
  /**
   * @todo
   * We are only supporting 1 set of time range in a day ** **FOR NOW
   */
  setBusinessDayActivity(state, action: PayloadAction<BusinessWeekDaysType>) {
    if (!state) return state;
    const day = action.payload;
    const hours = cloneDeep(state.hours);
    hours[day][0].isActive = !state.hours[day][0].isActive;

    return { ...state, hours };
  },
  setBusinessEveryDayActivity(state, action: PayloadAction<boolean>) {
    if (!state) return state;
    const hours = cloneDeep(state.hours);
    const days = Object.keys(hours);
    days.forEach((day) => {
      hours[day][0].isActive = action.payload;
    });

    return { ...state, hours };
  },
  setBusinessLocation(
    state,
    action: PayloadAction<{ location: BusinessLocationType }>
  ) {
    return { ...state, ...action.payload };
  },
  setBusinessIsRegistrationCompleted(
    state,
    action: PayloadAction<{ isRegistrationCompleted: boolean }>
  ) {
    return { ...state, ...action.payload };
  },
  setBusinessDeleted(state, action: PayloadAction<{ deleted: boolean }>) {
    return { ...state, ...action.payload };
  },

  setBusinessServicesFromDefault(state, action: PayloadAction<ServicesType[]>) {
    if (state?.services.length === 0 && !state.isRegistrationCompleted) {
      const defaultServices = action.payload.map((defaultService, index) => {
        return { ...defaultService, _id: `__DEFAULT__SERVICE__${index}__` };
      });
      return { ...state, services: defaultServices };
    } else {
      return state;
    }
  },
  setBusinessServices(state, action: PayloadAction<ServicesPayloadType>) {
    if (!state) return state;
    return { ...state, services: action.payload };
  },
  setBusinessService(state, action: PayloadAction<DocType<ServicesType>>) {
    const newBusinessService = [...state.services, action.payload];

    return { ...state, service: newBusinessService };
  },
};
