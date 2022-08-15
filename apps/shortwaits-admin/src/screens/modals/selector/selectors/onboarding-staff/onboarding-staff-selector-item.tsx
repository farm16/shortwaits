import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { ObjectId, UserType } from "@shortwaits/shared-types";

import { ButtonCard, Card, Spinner, Text } from "../../../../../components";
import { useTheme } from "../../../../../theme";

import { SelectorModalType } from "../../../../../navigation";
import { selectorConfigs } from "../../selector-config";

interface SelectorItemProps {
  type: SelectorModalType;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  item: UserType;
}

export function OnboardingCategoriesSelectorItem(props: SelectorItemProps) {
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
