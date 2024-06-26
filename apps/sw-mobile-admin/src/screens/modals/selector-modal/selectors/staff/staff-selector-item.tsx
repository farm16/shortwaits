import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import { SelectorListItem } from "@shortwaits/shared-ui";
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
  const isAdmin = item?.userRoles?.isAdmin ?? false;

  const title = (item.givenName || item.familyName || item.displayName || item.username) + (isAdmin ? " (Admin)" : "");
  const subTitle = item.email || item.phoneNumbers?.[0]?.number;

  return <SelectorListItem imageUrl={item.accountImageUrl} disabled={disabled} onPress={onSelect} rightIconName={rightIconName} title={title} subTitle={subTitle} />;
};
