import { SelectorConfig } from "./selector-types";

export type SelectorConfigsKeys = "staff" | "categories";

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
};
