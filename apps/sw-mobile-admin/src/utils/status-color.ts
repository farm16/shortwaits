import { EventStatusName } from "@shortwaits/shared-lib";

export const statusDisplayMessages: Record<EventStatusName, string> = {
  PENDING: "pending",
  APPROVED: "accepted",
  REJECTED: "canceled",
  CANCELED: "canceled",
  COMPLETED: "",
};

export const statusDisplayMessagesColor: Record<EventStatusName, string> = {
  PENDING: "#FFC107",
  APPROVED: "#4CAF50",
  REJECTED: "#F44336",
  CANCELED: "#F44336",
  COMPLETED: "#4CAF50", // TODO: change this color
};
