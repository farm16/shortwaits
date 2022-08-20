import React, { useMemo } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleProp, View, StyleSheet, ViewStyle } from "react-native";

import { Text } from "../common";
import { useTheme } from "../../theme";
import { get12hrTimeFromDecimal } from "../../utils";
import { ThemeColorName } from "../../theme/Colors";

const textColors: Record<string, ThemeColorName> = {
  text: "subText",
  title: "text",
};

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
  const textColor = useMemo(() => {
    return disabled ? Colors.lightGray : Colors[textColors[preset]];
  }, [Colors, disabled, preset]);

  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          ...styles[preset],
          color: textColor,
        }}
        text={get12hrTimeFromDecimal(startTime)}
      />
      <Icon
        color={Colors.brandAccent}
        name="arrow-right"
        size={preset === "title" ? 20 : 15}
      />
      <Text
        style={{
          ...styles[preset],
          color: textColor,
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
