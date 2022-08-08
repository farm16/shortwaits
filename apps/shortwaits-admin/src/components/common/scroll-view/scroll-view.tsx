import React from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import { ScrollView as RNGH_ScrollView } from "react-native-gesture-handler";

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
    <RNGH_ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...rest}
    >
      {children}
    </RNGH_ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {},
});
