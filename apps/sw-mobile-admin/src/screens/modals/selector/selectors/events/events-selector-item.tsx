import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { AgendaItem } from "../../../../../components";
import { SelectorModalData } from "../../../../../navigation";
import { SelectorItemProps } from "../../selector-types";

export function EventsSelectorItem(props: SelectorItemProps<SelectorModalData>) {
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

  return <AgendaItem item={item.itemData} triggerTick={false} />;
}
