import React from "react";
import { CategoryDtoType } from "@shortwaits/shared-types";

import { ButtonCard, Card, Text } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function CategoriesSelectorItem(
  props: SelectorItemProps<CategoryDtoType>
) {
  const {
    item,
    onSelectItem,
    disabled = false,
    multiple = false,
    isSelected,
  } = props;

  const getCheckIcon = () =>
    isSelected ? "checkbox-outline" : "checkbox-blank-outline";

  return (
    <ButtonCard
      rightIconName={multiple ? getCheckIcon() : "none"}
      disabled={disabled}
      title={item.name}
      onPress={() => {
        onSelectItem(item);
      }}
    />
  );
}
