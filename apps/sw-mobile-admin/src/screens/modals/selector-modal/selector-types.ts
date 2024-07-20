import { AvailableLanguagesType } from "@shortwaits/shared-lib";
import { CardProps, ThemeColorName } from "@shortwaits/shared-ui";

export interface SelectorItemProps<T> {
  isSelected?: boolean;
  disabled?: boolean;
  item: T;
  onSelectItem?(item: T): void;
  mode?: CardProps["mode"];
  language?: AvailableLanguagesType;
  multiple?: boolean;
  itemRightIconName?: string;
  itemRightIconColor?: ThemeColorName;
}
