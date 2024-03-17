import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../theme";
import { getResponsiveHeight } from "../../utils";

type SectionProps = {
  style?: StyleProp<ViewStyle>;
};
export const Section = (props: PropsWithChildren<SectionProps>) => {
  const { children, style: styleOverride } = props;
  const { Colors } = useTheme();
  const style = StyleSheet.flatten([
    styles.section,
    {
      backgroundColor: Colors.white,
    },
  ]);
  return <View style={[style, styleOverride]}>{children}</View>;
};

const styles = StyleSheet.create({
  section: {
    padding: getResponsiveHeight(16),
    borderRadius: getResponsiveHeight(10),
  },
});
