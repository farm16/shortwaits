import React from "react";
import { CategoriesPayloadType } from "@shortwaits/shared-types";

import { ButtonCard, Card, Spinner, Text } from "../../../../../components";
import { useTheme } from "../../../../../theme";
import { SelectorModalType } from "../../../../../navigation";

interface SelectorItemProps {
  type: SelectorModalType;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  item: CategoriesPayloadType;
}

export function OnboardingCategoriesSelectorItem(props: SelectorItemProps) {
  const { disabled, item } = props;
  const { Colors } = useTheme();
  return (
    <Card
      mode="button"
      disabled={disabled}
      rightIconSize={"large"}
      //checkbox-blank-outline
      rightIconName={"checkbox-outline"}
    >
      <Text preset="cardTitle" text={item.name} />
    </Card>
  );
}
