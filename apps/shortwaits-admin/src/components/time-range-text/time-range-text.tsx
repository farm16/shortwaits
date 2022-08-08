import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleProp, View, StyleSheet, ViewStyle } from "react-native";

import { Text } from "../common";
import { useTheme } from "@shortwaits/admin/theme";
import { get12hrTimeFromDecimal } from "@shortwaits/admin/utils";

export const TimeRangeText = ({
  style,
  startTime,
  endTime,
  preset = "text",
  disabled = false,
}: {
  style?: StyleProp<ViewStyle>;
  preset?: "text" | "title";
  startTime?: number;
  endTime?: number;
  disabled?: boolean;
}) => {
  const { Colors } = useTheme();
  const textColors = {
    text: Colors.subText,
    title: Colors.text,
  };
  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          ...styles[preset],
          color: disabled ? Colors.lightGray : textColors[preset],
        }}
        text={get12hrTimeFromDecimal(startTime)}
      />
      <Icon
        color={
          disabled
            ? Colors.lightGray
            : preset === "title"
            ? Colors.darkGray
            : textColors[preset]
        }
        name="arrow-right"
        size={preset === "title" ? 20 : 15}
      />
      <Text
        style={{
          ...styles[preset],
          color: disabled ? Colors.lightGray : textColors[preset],
          marginStart: styles[preset].marginEnd,
        }}
        text={get12hrTimeFromDecimal(endTime)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 12,
    marginEnd: 10,
    textTransform: "lowercase",
  },
  title: {
    fontSize: 23,
    marginEnd: 10,
    textTransform: "lowercase",
  },
});
