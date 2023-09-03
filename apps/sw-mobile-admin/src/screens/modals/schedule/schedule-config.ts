import { ScheduleModalModeType } from "../../../navigation";

export const scheduleConfigs: Record<
  ScheduleModalModeType,
  {
    headerTitle: string;
  }
> = {
  "My-Business-Hours": {
    headerTitle: "Business Hours",
  },
  "Business-User-Hours": {
    headerTitle: "User Schedule",
  },
  "Client-User-Hours": {
    headerTitle: "User Schedule",
  },
};
