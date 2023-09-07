import React from "react";
import { BusinessUserDtoType } from "@shortwaits/shared-lib";

import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function StaffSelectorItem(props: SelectorItemProps<BusinessUserDtoType> & { iconName: string }) {
  const { item, onSelectItem, iconName } = props;

  const title = item.givenName || item.familyName || item.displayName || item.username;

  return <ButtonCard onPress={() => onSelectItem(item)} title={title} subTitle={item.email} rightIconName={iconName} />;
}
