import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BusinessPayloadType } from "@shortwaits/shared-types";

import {
  SelectorMode,
  SelectorModalType,
  ModalPermissions,
} from "../../../navigation";

export interface SelectorConfig {
  searchOptions: {
    isSearchable: boolean;
    searchPlaceholder: string;
  };
  headerTitle: string;
  keys: {
    businessKey: keyof Pick<
      BusinessPayloadType,
      "services" | "categories" | "staff"
    >;
  };
  mode: SelectorMode;
  getIsSelected: (item, current) => boolean;
  action(arg: any): void;
  onSelect(item: any): void;
  getTileTitle: (item: any) => string;
  getTileSubTitle: (item: any) => string;
  itemQueryHook: (id: any) => any;
  filterId: (id: any) => any;
  filterItemQuery(item: any): any;
  itemsQueryHook: (business, user) => any;
  filterItemsQuery(item: any): any;
  permissions: ModalPermissions[];
  icons: {
    default?: string;
    selected?: string;
  };
}

export type SelectorConfigs = Record<SelectorModalType, SelectorConfig>;
