import { Text, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Section = ({ children, title, containerStyle }: SectionProps) => {
  const { Colors } = useTheme();

  if (title) {
    return (
      <>
        {title ? (
          <View
            style={[
              styles.titleContainer,
              {
                backgroundColor: Colors.lightBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  backgroundColor: Colors.lightBackground,
                  //,
                },
              ]}
              text={title}
            />
          </View>
        ) : null}
        <View style={[styles.sectionContainer, containerStyle]}>{children}</View>
      </>
    );
  }

  return <View style={[styles.sectionContainer, containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  sectionContainer: {
    // paddingHorizontal: getResponsiveHeight(16),
    backgroundColor: "white",
  },
  titleContainer: {
    paddingVertical: getResponsiveHeight(12),
    paddingHorizontal: getResponsiveHeight(16),
  },
  title: {
    fontSize: getResponsiveFontSize(14),
  },
});
