import { AvailableLanguagesType } from "@shortwaits/shared-lib";
import { ThemeColorName } from "../../../";

/**
 * - WRITE: Enable add/update capability.
 * - READ: Enable visibility capability.
 * - DELETE: Enable delete capability.
 */
export type ModalPermissions = "WRITE" | "READ" | "DELETE";
export interface SelectorConfig {
  headerTitle?: string;
  /**
   * should be selectMax > 0,
   * else disable select action
   *  */
  selectMax?: number;
  searchPlaceholder?: string;
  /**
   * func to initialize data
   */
  isReadOnly?: boolean;
  testId?: string;
}

export interface SelectorItemProps<T> {
  isSelected?: boolean;
  disabled?: boolean;
  item: T;
  onSelectItem?(item: T): void;
  language?: AvailableLanguagesType;
  multiple?: boolean;
  itemRightIconName?: string;
  itemRightIconColor?: ThemeColorName;
}
