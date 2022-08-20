import { ScheduleModalType } from "../../../navigation/navigation-types";

export interface ScheduleConfig {
  headerTitle: string;
}
export type ScheduleConfigs = Record<ScheduleModalType, ScheduleConfig>;
