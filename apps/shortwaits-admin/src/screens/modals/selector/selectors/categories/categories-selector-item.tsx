import React from "react";
import { CategoryDtoType } from "@shortwaits/shared-types";

import { Card, Text } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function CategoriesSelectorItem(
  props: SelectorItemProps<CategoryDtoType>
) {
  const { disabled = false, item, isSelected, onSelectItem } = props;

  return (
    <Card
      mode="button"
      disabled={disabled}
      rightIconSize={"large"}
      onPress={() => onSelectItem(item)}
      rightIconName={isSelected ? "checkbox-outline" : "checkbox-blank-outline"}
    >
      <Text preset="cardTitle" text={item.name} />
    </Card>
  );
}
