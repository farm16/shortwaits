import { SuccessResponseType } from "@shortwaits/shared-types";
import {
  ScheduleMode,
  ScheduleModalType,
  ModalPermissions,
} from "@shortwaits/admin/navigation/navigation-types";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export interface ScheduleConfig {
  headerTitle: string;
  hooks: {
    queryHook: UseQuery<
      QueryDefinition<string, any, any, SuccessResponseType<any>, string>
    >;
  };
  mode: ScheduleMode;
  getCurrent?: any;
  setDaySchedule?: any;
  setDayActivity?: any;
  permissions: ModalPermissions[];
}
export type ScheduleConfigs = Record<ScheduleModalType, ScheduleConfig>;
