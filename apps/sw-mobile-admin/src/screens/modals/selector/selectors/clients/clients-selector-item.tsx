import React, { FC } from "react";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import { SelectorListItem } from "../../../../../components";

type ClientsSelectorItemProps = {
  disabled?: boolean;
  item: ClientUserDtoType;
  onSelect: () => void;
  rightIconName?: string;
  leftIconName?: string;
};

export const ClientsSelectorItem: FC<ClientsSelectorItemProps> = props => {
  const { item, onSelect, rightIconName, disabled = false } = props;
  const title = item.givenName || item.familyName || item.displayName || item.username;
  const subTitle = item.email || item.phoneNumbers?.[0]?.number;

  return (
    <SelectorListItem
      imageUrl={item.accountImageUrl}
      disabled={disabled}
      onPress={onSelect}
      rightIconName={rightIconName}
      title={title}
      subTitle={subTitle}
    />
  );
};
