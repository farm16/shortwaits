import { EventStatusName } from "@shortwaits/shared-lib";
import { ThemeColorName } from "../theme/Colors";

// these are the available/remaining statues for each event status
export const nextEventStatuses: Record<EventStatusName, EventStatusName[]> = {
  PENDING: ["CANCELED", "REJECTED", "APPROVED"],
  APPROVED: ["CANCELED", "COMPLETED"],
  REJECTED: [],
  CANCELED: [],
  COMPLETED: [],
};

export const eventStatusIconNames: Record<EventStatusName, string> = {
  PENDING: "clock-outline",
  APPROVED: "thumb-up-outline",
  REJECTED: "thumb-down-outline",
  CANCELED: "cancel",
  COMPLETED: "check-circle-outline",
};

export const eventStatusColors: Record<EventStatusName, { color: ThemeColorName; backgroundColor: ThemeColorName }> = {
  PENDING: { color: "text", backgroundColor: "brandAccent" },
  APPROVED: { color: "green3", backgroundColor: "brandAccent" },
  REJECTED: { color: "red3", backgroundColor: "brandAccent" },
  CANCELED: { color: "white", backgroundColor: "red3" },
  COMPLETED: { color: "green3", backgroundColor: "brandAccent" },
};

export const eventStatusNames: Record<EventStatusName, string> = {
  PENDING: "Pending",
  APPROVED: "Accept",
  REJECTED: "Reject",
  CANCELED: "Cancel",
  COMPLETED: "Complete",
};

export const CALENDAR_EVENT_HEIGHT = 75;
export const EVENT_ITEM_BORDER_RADIUS = 6;
