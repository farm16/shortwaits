import { ServiceDtoType } from "@shortwaits/shared-lib";
import { ServiceItem } from "@shortwaits/shared-ui";
import React from "react";
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
