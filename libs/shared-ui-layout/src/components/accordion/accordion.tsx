import { noop } from "lodash";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useTheme } from "../../theme";
import { AccordionItem } from "./accordion-item";

export interface AccordionDataItemType {
  title: string;
  description: string;
  iconName?: string;
  iconColor?: string;
  onPress?: () => void;
}

interface AccordionProps extends Partial<React.ComponentProps<typeof List.Accordion>> {
  accordionTitle: string;
  accordionData: AccordionDataItemType[];
}

export const Accordion: React.FC<AccordionProps> = ({ accordionTitle, accordionData, ...rest }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title={accordionTitle}
      expanded={expanded}
      onPress={handlePress}
      style={{
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Colors.lightBackground,
      }}
      titleStyle={{ color: Colors.text }}
      right={props => <List.Icon {...props} color={Colors.brandPrimary} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />}
      {...rest}
    >
      {accordionData?.map((data, index) => (
        <AccordionItem key={index} title={data.title} onPress={data.onPress ?? noop} description={data.description} iconName={data.iconName} iconColor={data.iconColor} />
      ))}
    </List.Accordion>
  );
};
