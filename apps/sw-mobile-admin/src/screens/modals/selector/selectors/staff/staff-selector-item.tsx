import React from "react";
import { BusinessUserDtoType } from "@shortwaits/shared-lib";

import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function StaffSelectorItem(props: SelectorItemProps<BusinessUserDtoType>) {
  const { item, onSelectItem } = props;

  return <ButtonCard onPress={() => onSelectItem(item)} title={item.username} subTitle={item.email} />;
}
