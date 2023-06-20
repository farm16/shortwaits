import React from "react";

import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function StaticSelectorItem(
  props: SelectorItemProps<string | { title: string; subTitle: string }>
) {
  const {
    item,
    onSelectItem,
    disabled = false,
    multiple = false,
    isSelected,
  } = props;

  const isString = typeof item === "string";

  const getCheckIcon = () => (isSelected ? "check" : "circle");

  return (
    <ButtonCard
      rightIconName={multiple ? getCheckIcon() : "none"}
      disabled={disabled}
      title={isString ? item : item.title}
      subTitle={isString ? undefined : item.subTitle}
      onPress={() => {
        onSelectItem(item);
      }}
    />
  );
}
