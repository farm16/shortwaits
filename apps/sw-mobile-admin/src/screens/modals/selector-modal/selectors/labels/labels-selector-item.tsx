import { BusinessLabelType } from "@shortwaits/shared-lib";
import { Card, Emoji, Space, Text } from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

type LabelSelectorItemProps = {
  disabled?: boolean;
  item: BusinessLabelType;
  onSelect: () => void;
  /**
   * @default false
   * this only sets the initial state of the checkbox
   * after that it will be controlled by the item itself
   */
  initialIsSelected?: boolean;
};

export function LabelSelectorItem(props: LabelSelectorItemProps) {
  const { initialIsSelected, item, onSelect, disabled } = props;
  const [isSelected, setIsSelected] = useState(initialIsSelected);

  const handleOnSelect = useCallback(() => {
    setIsSelected(prev => !prev);
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  return (
    <Card mode="button" disabled={disabled} rightIconName={isSelected ? "checkbox-outline" : "checkbox-blank-outline"} onPress={handleOnSelect}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            paddingRight: 16,
            justifyContent: "center",
          }}
        >
          <Emoji name={item?.emojiShortName} size={30} />
        </View>
        <View style={{ flex: 1 }}>
          <Text preset="cardTitle" text={item?.name} />
          {item?.description && (
            <>
              <Space size="tiny" />
              <Text
                preset="cardSubtitle"
                text={truncate(item?.description, {
                  length: 35,
                })}
              />
            </>
          )}
        </View>
      </View>
    </Card>
  );
}
