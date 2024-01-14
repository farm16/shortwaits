import { SelectorConfig } from "./selector-types";

export type SelectorConfigsKeys = "staff" | "categories" | "services" | "labels" | "static" | "clients" | "eventLabels" | "events";

export const selectorConfigs: Record<SelectorConfigsKeys, SelectorConfig> = {
  categories: {
    headerTitle: "Categories",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  staff: {
    headerTitle: "Staff",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  clients: {
    headerTitle: "Clients",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  services: {
    headerTitle: "Services",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  labels: {
    headerTitle: "My Labels",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  eventLabels: {
    headerTitle: "Business Labels",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  events: {
    headerTitle: "Events",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  static: {
    searchPlaceholder: "search",
  },
};
