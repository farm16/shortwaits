import { SelectorConfig } from "./selector-types";

export type SelectorConfigsKeys =
  | "onboarding-categories"
  | "onboarding-staff"
  | "staff"
  | "categories";

export const selectorConfigs: Record<SelectorConfigsKeys, SelectorConfig> = {
  "onboarding-categories": {
    headerTitle: "Categories",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
  "onboarding-staff": {
    headerTitle: "Staff",
    isReadOnly: false,
    searchPlaceholder: "search",
  },
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
