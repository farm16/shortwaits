import { AvailableLanguagesType } from "@shortwaits/shared-lib";
import { ThemeColorName } from "@shortwaits/shared-ui";

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
