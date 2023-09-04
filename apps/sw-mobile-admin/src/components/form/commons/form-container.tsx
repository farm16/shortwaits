import React, { ReactNode, ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Screen, ScrollView, Space } from "../..";
import { ScreenProps } from "../../common/screen/screen.props";
import { useTheme } from "../../../theme";

type FormContainerProps = {
  children: ReactNode;
  footer?: ReactElement;
} & ScreenProps;

export const FormContainer = (props: FormContainerProps) => {
  const { children, footer, preset = "scroll", ...rest } = props;
  const clonedFooter = footer ? React.cloneElement(footer) : null;

  const { Colors } = useTheme();
  const backgroundColor = Colors.backgroundOverlay;

  if (preset === "fixed") {
    return (
      <Screen preset="fixed" unsafe {...rest}>
        <Space size="tiny" />
        <View style={styles.fixedView}>{children}</View>
        {clonedFooter ? <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View> : null}
      </Screen>
    );
  }

  return (
    <Screen preset="fixed" unsafe {...rest}>
      <Space size="tiny" />
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
      {clonedFooter ? <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {},
  fixedView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.1)",
      },
    }),
  },
});
