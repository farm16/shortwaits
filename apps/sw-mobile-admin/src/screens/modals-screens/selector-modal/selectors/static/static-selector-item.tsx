import { Card, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { GenericModalData } from "../../../../../navigation";
import { SelectorItemProps } from "../../selector-types";

export function StaticSelectorItem(props: SelectorItemProps<GenericModalData>) {
  const { item, onSelectItem, disabled = false, multiple = false, isSelected, itemRightIconColor, itemRightIconName, mode } = props;

  const isString = typeof item === "string";

  const { Colors } = useTheme();
  const getCheckIcon = () => {
    if (isSelected && multiple) {
      return "check";
    }
    if (itemRightIconName) {
      return itemRightIconName;
    }
    return "none";
  };

  const title = isString ? item : item.title;
  const subTitle = isString ? undefined : item.subTitle;

  return (
    <Card
      onPress={() => {
        onSelectItem(item);
      }}
      mode="static"
      rightIconName={getCheckIcon()}
      rightIconColor={itemRightIconColor ? Colors[itemRightIconColor] : undefined}
    >
      <Text preset={"cardTitle"} text={isString ? item : item.title} />
      {subTitle && (
        <>
          <Space size="tiny" />
          <Text preset={"cardSubtitle"} text={subTitle} />
        </>
      )}
    </Card>

    // <ButtonCard
    //   rightIconName={getCheckIcon()}
    //   rightIconColor={itemRightIconColor ? Colors[itemRightIconColor] : undefined}
    //   disabled={disabled}
    //   title={isString ? item : item.title}
    //   subTitle={isString ? undefined : item.subTitle}
    //   onPress={() => {
    //     onSelectItem(item);
    //   }}
    // />
  );
}
