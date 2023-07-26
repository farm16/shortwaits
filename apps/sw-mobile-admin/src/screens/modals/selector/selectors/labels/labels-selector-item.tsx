import React from "react";
import { BusinessLabelType } from "@shortwaits/shared-lib";

import { Text, Card, Space, Emoji } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";
import { View } from "react-native";

export function LabelSelectorItem(props: SelectorItemProps<BusinessLabelType>) {
  const { item, onSelectItem } = props;

  return (
    <Card
      mode="button"
      onPress={() => {
        onSelectItem(item);
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text preset="cardTitle" text={item.name} />
          {item.description && (
            <>
              <Space size="tiny" />
              <Text preset="cardSubtitle" text={item.description} />
            </>
          )}
        </View>
        <View
          style={{
            paddingLeft: 16,
            justifyContent: "center",
          }}
        >
          <Emoji name={item.emojiShortName} size={30} />
        </View>
      </View>
    </Card>
  );
}
