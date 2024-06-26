import React from "react";

import { ButtonCard, useTheme } from "@shortwaits/shared-ui";
import { SelectorModalData } from "../../../../../navigation";
import { SelectorItemProps } from "../../selector-types";

export function StaticSelectorItem(props: SelectorItemProps<SelectorModalData>) {
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
        onSelectItem(item);
      }}
    />
  );
}
