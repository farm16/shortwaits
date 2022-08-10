import { BusinessSlice } from "./business-slice";

export const {
  setBusiness,
  setBusinessServicesFromDefault,
  setBusinessEveryDayActivity,
  setBusinessShortName,
  setBusinessDescription,
  setBusinessCurrency,
  setBusinessCountry,
  setBusinessPhone1,
  setBusinessWeekSchedule,
  setBusinessDaySchedule,
  setBusinessDayActivity,
  setBusinessLocation,
  setBusinessCategories,
  setBusinessCategory,
  setBusinessStaff,
  setBusinessService,
  setBusinessServices,
  setBusinessIsRegistrationCompleted,
  setBusinessDeleted,
  resetBusiness,
} = BusinessSlice.actions;
