import { ServiceDtoType } from "@shortwaits/shared-utils";
import React from "react";
import { ServiceItem } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function ServiceSelectorItem(props: SelectorItemProps<ServiceDtoType>) {
  const { item, onSelectItem, isSelected } = props;

  return (
    <ServiceItem
      isSelected={isSelected}
      service={item}
      onPress={service => {
        onSelectItem(service);
      }}
    />
  );
}
