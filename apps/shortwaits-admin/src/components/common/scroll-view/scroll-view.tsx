import React from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import { ScrollView as ScrollViewRn } from "react-native-gesture-handler";

export function ScrollView(props: ScrollViewProps) {
  const {
    children,
    contentContainerStyle: contentContainerStyleOverride,
    ...rest
  } = props;
  const contentContainerStyle = [
    styles.contentContainerStyle,
    contentContainerStyleOverride,
  ];
  return (
    <ScrollViewRn
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...rest}
    >
      {children}
    </ScrollViewRn>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {},
});
