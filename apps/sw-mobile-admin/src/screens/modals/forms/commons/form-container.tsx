import React, { ReactNode, ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Screen, ScrollView, Space } from "../../../../components";
import { useTheme } from "../../../../theme";

interface FormContainerProps {
  children: ReactNode;
  footer?: ReactElement;
}

export const FormContainer = ({ children, footer }: FormContainerProps) => {
  const clonedFooter = footer ? React.cloneElement(footer) : null;

  const { Colors } = useTheme();
  const backgroundColor = Colors.backgroundOverlay;

  return (
    <Screen preset="fixed" unsafe>
      <Space size="tiny" />
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
      {clonedFooter ? (
        <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View>
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {},
  scrollView: {
    paddingHorizontal: 16,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.8)", //"#000
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});