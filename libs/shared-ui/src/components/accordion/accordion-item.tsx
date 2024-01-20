import React from "react";
import { List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "../../theme";

interface AccordionItemProps {
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  onPress?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  description,
  iconName,
  iconColor = "#000",
  onPress,
}) => {
  const { Colors } = useTheme();

  return (
    <List.Item
      titleStyle={{ color: Colors.text }}
      descriptionStyle={{ color: Colors.subText }}
      style={{
        backgroundColor: Colors.white,
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      title={title}
      description={description}
      onPress={onPress}
      right={iconName ? props => <List.Icon {...props} icon={iconName} color={iconColor} /> : null}
    />
  );
};
