import { BusinessDtoType } from "@shortwaits/shared-lib";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../../theme";

export const BusinessInfoSettings = ({ business }: { business: BusinessDtoType }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Business Information"
      expanded={expanded}
      onPress={handlePress}
      style={{
        backgroundColor: Colors.backgroundOverlay,
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      titleStyle={{ color: Colors.text }}
      descriptionStyle={{ color: Colors.subText }}
      right={props => (
        <List.Icon {...props} color={Colors.text} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
      )}
    >
      <Divider />
      <List.Item
        title="Business name"
        style={{ backgroundColor: Colors.backgroundOverlay }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        description={business.longName || business.shortName}
        right={props => <List.Icon {...props} color={Colors.text} icon="store" />}
      />
      <Divider />
      <List.Item
        title="Business Currency"
        disabled
        style={{ backgroundColor: Colors.backgroundOverlay }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        description={"USD"}
        right={props => <List.Icon {...props} color={Colors.text} icon="currency-usd" />}
      />
    </List.Accordion>
  );
};
