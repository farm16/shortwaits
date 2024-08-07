export type SelectorConfigsKeys = "staff" | "categories" | "services" | "labels" | "static" | "eventLabels" | "events";

export const selectorConfigs: Record<SelectorConfigsKeys, any> = {
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
    headerTitle: "Event",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  static: {
    searchPlaceholder: "search",
  },
};
