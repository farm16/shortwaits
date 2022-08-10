import { noop } from "lodash";
import {
  BusinessPayloadType,
  BusinessType,
  CategoriesPayloadType,
  UserPayloadType,
} from "@shortwaits/shared-types";

import { SelectorConfigs } from "./selector-types";
import { setBusinessCategories } from "../../../redux/business";
import { navigate } from "../../../utils";
import {
  useGetUserQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetBusinessStaffQuery,
} from "../../../services/shortwaits-api";
import { useBusiness } from "../../../hooks";

export const selectorConfigs: SelectorConfigs = {
  "My-Business-Categories": {
    permissions: ["READ", "READ", "DELETE"],
    searchOptions: {
      searchPlaceholder: "Search",
      isSearchable: true,
    },
    headerTitle: "Categories",
    keys: {
      businessKey: "categories",
    },
    mode: "SELECT-MANY",
    action: (item: CategoriesPayloadType) => setBusinessCategories(item._id),
    onSelect: () => null,
    filterId: (item) => item._id,
    itemQueryHook: (id) => useGetCategoryQuery(id),
    filterItemQuery: (item) => item?.data,
    itemsQueryHook: (business: BusinessPayloadType, user: UserPayloadType) =>
      useGetCategoriesQuery(""),
    filterItemsQuery: (item) => item?.data,
    getIsSelected: (
      item: CategoriesPayloadType,
      current: BusinessType["categories"]
    ) => current.includes(item._id),
    getTileTitle: (item: CategoriesPayloadType) => item.name,
    getTileSubTitle: (_item: CategoriesPayloadType) => "",
    icons: {
      default: "checkbox-blank-circle-outline",
      selected: "checkbox-marked-circle-outline",
    },
  },
  "My-Business-Staff": {
    getIsSelected: () => false,
    permissions: ["READ", "WRITE", "DELETE"],
    searchOptions: {
      searchPlaceholder: "Search",
      isSearchable: false,
    },
    headerTitle: "Personnel",
    keys: {
      businessKey: "staff",
    },
    mode: "NONE",
    action: noop,
    filterId: (item) => item,
    itemQueryHook: (id) => useGetUserQuery(id),
    filterItemQuery: (item) => item,
    itemsQueryHook: (business: BusinessPayloadType, user: UserPayloadType) =>
      business._id
        ? useGetBusinessStaffQuery(business._id)
        : { data: useBusiness().staff },
    filterItemsQuery: (item) => item,
    getTileTitle: (item: UserPayloadType) => item.firstName || item.username,
    getTileSubTitle: (_item: UserPayloadType) => "",
    onSelect: (_item) => {
      navigate("modals", {
        screen: "schedule-modal-screen",
        params: {
          scheduleType: "My-Business-Hours",
        },
      });
    },
    icons: {
      default: "dots-vertical",
      selected: undefined,
    },
  },
};
