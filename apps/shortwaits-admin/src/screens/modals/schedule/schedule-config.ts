import {
  setBusinessDayActivity,
  setBusinessDaySchedule,
} from "@shortwaits/admin/redux/business";
import {
  useGetBusinessCategoryQuery,
  useGetBusinessStaffQuery,
} from "@shortwaits/admin/services/api";
import { ScheduleConfigs } from "./schedule-types";

export const scheduleConfigs: ScheduleConfigs = {
  "My-Business-Hours": {
    headerTitle: "Business Hours",
    hooks: {
      queryHook: useGetBusinessCategoryQuery,
    },
    permissions: ["READ"],
    mode: "",
    setDaySchedule: setBusinessDaySchedule,
    setDayActivity: setBusinessDayActivity,
    getCurrent: (data: { category: any }) => data.category,
  },
  "User-Hours": {
    headerTitle: "User Schedule",
    hooks: {
      queryHook: useGetBusinessStaffQuery,
    },
    permissions: ["READ"],
    mode: "",
    setDaySchedule: setBusinessDaySchedule,
    setDayActivity: setBusinessDayActivity,
    getCurrent: (data: { category: any }) => data.category,
  },
};
