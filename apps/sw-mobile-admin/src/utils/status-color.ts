import { EventStatusName } from "@shortwaits/shared-lib";

export const statusDisplayMessages: Record<EventStatusName, string> = {
  PENDING: "pending",
  APPROVED: "accepted",
  REJECTED: "rejected",
  CANCELED: "canceled",
  COMPLETED: "completed",
};

export const statusDisplayMessagesColor: Record<EventStatusName, string> = {
  PENDING: "#FFC107",
  APPROVED: "#4CAF50",
  REJECTED: "#f45336",
  CANCELED: "#b8270d",
  COMPLETED: "#304f3f", //"rgba(77, 77, 77,0.55)", // TODO: change this color
};
