import { SelectorListItem } from "@shortwaits/shared-ui";
import { BusinessUserDtoType } from "@shortwaits/shared-utils";
import React, { FC } from "react";

type StaffSelectorItemProps = {
  disabled?: boolean;
  item: BusinessUserDtoType;
  onSelect: () => void;
  rightIconName?: string;
  leftIconName?: string;
};

export const StaffSelectorItem: FC<StaffSelectorItemProps> = props => {
  const { item, onSelect, rightIconName, disabled = false } = props;
  const title = item.givenName || item.familyName || item.displayName || item.username;
  const subTitle = item.email || item.phoneNumbers?.[0]?.number;

  return <SelectorListItem imageUrl={item.accountImageUrl} disabled={disabled} onPress={onSelect} rightIconName={rightIconName} title={title} subTitle={subTitle} />;
};
