import { SelectorConfig } from "./selector-types";

export type SelectorConfigsKeys =
  | "staff"
  | "categories"
  | "services"
  | "static";

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
  services: {
    headerTitle: "Services",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  static: {
    searchPlaceholder: "search",
  },
};
