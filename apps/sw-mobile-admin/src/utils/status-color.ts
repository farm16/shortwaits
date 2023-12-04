import { EventStatusName } from "@shortwaits/shared-lib";

export const statusDisplayMessages: Record<EventStatusName, string> = {
  PENDING: "pending",
  APPROVED: "accepted",
  REJECTED: "rejected",
  CANCELED: "canceled",
  COMPLETED: "completed",
};

export const statusDisplayMessagesColor: Record<EventStatusName, string> = {
  PENDING: "#f39c12",
  APPROVED: "#30cb83",
  REJECTED: "#e74c3c",
  CANCELED: "#34495e",
  COMPLETED: "#f2faf2",
};

export const statusDisplayMessagesBackgroundColor: Record<EventStatusName, string> = {
  PENDING: "#fdf5e7",
  APPROVED: "#eaf9f2",
  REJECTED: "#fcf2f2",
  CANCELED: "#eaecee",
  COMPLETED: "#30cb83",
};
