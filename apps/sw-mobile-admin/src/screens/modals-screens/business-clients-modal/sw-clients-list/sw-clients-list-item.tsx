import { ClientDtoType } from "@shortwaits/shared-lib";
import { SelectorListItem } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useState } from "react";

type ClientsSelectorItemProps = {
  disabled?: boolean;
  item: ClientDtoType;
  onSelect: () => void;
  /**
   * @default false
   * this only sets the initial state of the checkbox
   * after that it will be controlled by the item itself
   */
  initialIsSelected?: boolean;
};

export const ClientsSelectorItem: FC<ClientsSelectorItemProps> = props => {
  const { initialIsSelected, item, onSelect, disabled = false } = props;
  const title = item.givenName || item.familyName || item.displayName || item.username;
  const subTitle = item.email || item.phoneNumbers?.[0]?.number;
  const [isSelected, setIsSelected] = useState(initialIsSelected);

  const handleOnSelect = useCallback(() => {
    setIsSelected(prev => !prev);
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  return (
    <SelectorListItem
      imageUrl={item.accountImageUrl}
      disabled={disabled}
      onPress={handleOnSelect}
      rightIconName={isSelected ? "checkbox-outline" : "checkbox-blank-outline"}
      title={title}
      subTitle={subTitle}
    />
  );
};
