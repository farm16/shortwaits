import React from "react";
import { BusinessUserType } from "@shortwaits/shared-types";

import { ButtonCard, Card, Text } from "../../../../../components";
import { useTheme } from "../../../../../theme";
import { SelectorModalType } from "../../../../../navigation";

interface SelectorItemProps {
  type: SelectorModalType;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  item: BusinessUserType;
}

export function StaffSelectorItem(props: SelectorItemProps) {
  const { item } = props;

  return <ButtonCard title={item.username} subTitle={item.username} />;
}
