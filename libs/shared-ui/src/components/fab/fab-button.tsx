import { Portal } from "@gorhom/portal";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColorName, useTheme } from "../../theme";
import { getResponsiveHeight } from "../../utils";

type FloatingActionButtonProps = {
  hasPaddingBottom?: boolean;
  onPress?(): void;
  icon?: string;
  isVisible?: boolean;
  backgroundColor?: ThemeColorName;
  iconColor?: ThemeColorName;
  withPortal?: boolean;
  label?: string;
  isAnimated?: boolean;
};

export const FabButton = (props: FloatingActionButtonProps) => {
  const { icon = "plus", isAnimated, label, iconColor, isVisible = true, onPress, backgroundColor, withPortal, ...rest } = props;

  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();

  const floatingActionButton = useCallback(() => {
    const withSpaces = withPortal
      ? {
          bottom: insets.bottom + getResponsiveHeight(70),
          right: insets.right + getResponsiveHeight(16),
        }
      : {
          bottom: getResponsiveHeight(16),
          right: getResponsiveHeight(16),
        };

    const fabProps = {
      visible: isVisible,
      label: label,
      style: [
        styles.fab,
        withSpaces,
        {
          backgroundColor: backgroundColor ? Colors[backgroundColor] : Colors.brandSecondary,
        },
      ],
      icon: icon,
      color: iconColor ? Colors[iconColor] : Colors.white,
      onPress: () => {
        if (onPress) {
          onPress();
        }
      },
    };

    return <FAB {...fabProps} />;
  }, [Colors, backgroundColor, icon, iconColor, insets.bottom, insets.right, isVisible, label, onPress, withPortal]);

  if (withPortal) {
    return <Portal>{floatingActionButton()}</Portal>;
  }
  return floatingActionButton();
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
  },
});
