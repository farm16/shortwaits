import { SelectorListItem } from "@shortwaits/shared-ui";
import { ClientUserDtoType } from "@shortwaits/shared-utils";
import React, { FC } from "react";

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

  return <SelectorListItem imageUrl={item.accountImageUrl} disabled={disabled} onPress={onSelect} rightIconName={rightIconName} title={title} subTitle={subTitle} />;
};
