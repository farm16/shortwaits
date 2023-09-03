import { EventStatusName } from "@shortwaits/shared-lib";

export const statusDisplayMessages: Record<EventStatusName, string> = {
  PENDING: "pending",
  APPROVED: "accepted",
  REJECTED: "rejected",
  CANCELED: "canceled",
  COMPLETED: "completed",
};

export const statusDisplayMessagesColor: Record<EventStatusName, string> = {
  PENDING: "rgb(144,99,61)",
  APPROVED: "rgb(113,160,153)",
  REJECTED: "rgb(185,72,58)",
  CANCELED: "rgb(185,72,58)",
  COMPLETED: "rgb(95,95,95)",
};

export const statusDisplayMessagesBackgroundColor: Record<EventStatusName, string> = {
  PENDING: "rgb(253,244,219)",
  APPROVED: "rgb(239,249,245)",
  REJECTED: "rgb(254,243,241)",
  CANCELED: "rgb(254,243,241)",
  COMPLETED: "rgb(241,241,241)",
};
