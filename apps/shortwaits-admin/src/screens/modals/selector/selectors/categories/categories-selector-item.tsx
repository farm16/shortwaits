import React, { useMemo } from "react";
import {
  BusinessPayloadType,
  BusinessType,
  CategoriesPayloadType,
} from "@shortwaits/shared-types";
import { useDispatch } from "react-redux";

import { ButtonCard, Card, Spinner, Text } from "../../../../../components";
import { useTheme } from "../../../../../theme";
import { SelectorModalType } from "../../../../../navigation";
import { setBusinessCategory } from "../../../../../redux";

interface SelectorItemProps {
  type: SelectorModalType;
  index: number;
  business: BusinessPayloadType;
  // isSelected: boolean;
  disabled: boolean;
  item: CategoriesPayloadType;
}

export function CategoriesSelectorItem(props: SelectorItemProps) {
  const { disabled, item, business } = props;
  const dispatch = useDispatch();

  const isSelected = useMemo(() => {
    return business.categories.includes(item._id);
  }, [business.categories, item._id]);

  return (
    <Card
      mode="button"
      disabled={disabled}
      rightIconSize={"large"}
      onPress={() => dispatch(setBusinessCategory(item._id))}
      //checkbox-blank-outline
      rightIconName={isSelected ? "checkbox-outline" : "checkbox-blank-outline"}
    >
      <Text preset="cardTitle" text={item.name} />
    </Card>
  );
}
