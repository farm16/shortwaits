import { Card, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { GenericModalData } from "../../../../../navigation";
import { SelectorItemProps } from "../../selector-types";

export function StaticSelectorItem(props: SelectorItemProps<GenericModalData>) {
  const { item, onSelectItem, disabled = false, multiple = false, isSelected, itemRightIconColor, itemRightIconName, mode } = props;

  const isString = typeof item === "string";

  const { Colors } = useTheme();
  const getCheckIcon = () => {
    if (isSelected) {
      return "check";
    }
    if (itemRightIconName) {
      return itemRightIconName;
    }
    return "none";
  };

  return (
    <Card
      onPress={() => {
        onSelectItem(item);
      }}
      mode={mode}
      rightIconName={getCheckIcon()}
      rightIconColor={itemRightIconColor ? Colors[itemRightIconColor] : undefined}
    >
      <Text preset={"cardTitle"} text={isString ? item : item.title} />
      {item?.subTitle ? (
        <>
          <Space size="tiny" />
          <Text preset={"cardSubtitle"} text={item?.subTitle ?? ""} />
        </>
      ) : null}
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
