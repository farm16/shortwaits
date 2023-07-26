import React from "react";
import { ServiceDtoType } from "@shortwaits/shared-lib";
import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function StaffSelectorItem(props: SelectorItemProps<ServiceDtoType>) {
  const { item, onSelectItem } = props;

  return (
    <ButtonCard
      onPress={() => onSelectItem(item)}
      title={item.name}
      subTitle={item.price.toString()}
    />
  );
}
