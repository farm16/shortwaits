import { BusinessLabelType } from "@shortwaits/shared-lib";
import { Card, Emoji, Space, Text } from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React from "react";
import { View } from "react-native";
import { SelectorItemProps } from "../../selector-types";

export function LabelSelectorItem(props: SelectorItemProps<BusinessLabelType>) {
  const { item, onSelectItem, isSelected } = props;

  const getCheckIcon = () => (isSelected ? "checkbox-outline" : "checkbox-blank-outline");

  return (
    <Card
      mode="button"
      leftIconName={getCheckIcon()}
      onPress={() => {
        onSelectItem(item);
      }}
    >
      <View style={{ flexDirection: "row" }}>
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
        <View
          style={{
            paddingLeft: 16,
            justifyContent: "center",
          }}
        >
          <Emoji name={item?.emojiShortName} size={30} />
        </View>
      </View>
    </Card>
  );
}
