import { ClientDtoType } from "@shortwaits/shared-lib";
import { SelectorListItem } from "@shortwaits/shared-ui";
import React, { FC, useCallback } from "react";

type ClientsSelectorItemProps = {
  disabled?: boolean;
  item: ClientDtoType;
  onSelect: () => void;
};

export const ClientsListItem: FC<ClientsSelectorItemProps> = props => {
  const { item, onSelect, disabled = false } = props;
  const title = item.givenName || item.familyName || item.displayName || item.username;
  const subTitle = item.email || item.phoneNumbers?.[0]?.number;

  const handleOnSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  return <SelectorListItem imageUrl={item.accountImageUrl} disabled={disabled} onPress={handleOnSelect} rightIconName={"dots-vertical"} title={title} subTitle={subTitle} />;
};
