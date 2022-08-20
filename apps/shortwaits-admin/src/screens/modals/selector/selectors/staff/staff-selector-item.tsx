import React from "react";
import { UserType } from "@shortwaits/shared-types";

import { Card, Text } from "../../../../../components";
import { useTheme } from "../../../../../theme";
import { SelectorModalType } from "../../../../../navigation";

interface SelectorItemProps {
  type: SelectorModalType;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  item: UserType;
}

export function StaffSelectorItem(props: SelectorItemProps) {
  const { disabled, item } = props;
  const { Colors } = useTheme();
  return (
    <Card
      mode="button"
      disabled={disabled}
      rightIconSize={"large"}
      rightIconName={"chevron-right"}
    >
      <Text preset="cardTitle" text={item.username} />
      <Text
        preset="cardSubtitle"
        style={{ color: Colors.text }}
        text={item.username}
      />
    </Card>
  );
}
