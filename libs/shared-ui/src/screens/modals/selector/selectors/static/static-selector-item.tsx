import React from "react";
import { ButtonCard, useTheme } from "../../../../../";
import { SelectorItemProps } from "../../selector-types";

type StaticSelectorItemProps = SelectorItemProps<{
  key: string;
  title: string;
  subTitle?: string;
  itemData?: any;
}>;

export function StaticSelectorItem(props: StaticSelectorItemProps) {
  const { item, onSelectItem, disabled = false, multiple = false, isSelected, itemRightIconColor, itemRightIconName } = props;

  const isString = typeof item === "string";

  const { Colors } = useTheme();
  const getCheckIcon = () => {
    if (isSelected && multiple) {
      return "check";
    }
    if (itemRightIconName) {
      return itemRightIconName;
    }
    return "none";
  };

  return (
    <ButtonCard
      rightIconName={getCheckIcon()}
      rightIconColor={itemRightIconColor ? Colors[itemRightIconColor] : undefined}
      disabled={disabled}
      title={isString ? item : item.title}
      subTitle={isString ? undefined : item.subTitle}
      onPress={() => {
        if (onSelectItem) {
          onSelectItem(item);
        }
      }}
    />
  );
}
