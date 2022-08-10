import React from "react";
import { StyleSheet, View } from "react-native";

import { getDimensions, useTheme } from "../../theme";
import {
  TextField,
  TextFieldProps,
  Card,
  Text,
  CardIconsProps,
} from "../common";

interface TextFieldCard extends TextFieldProps, Partial<CardIconsProps> {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
}

export function TextFieldCard(props: TextFieldCard) {
  const {
    placeholder,
    preset = "default",
    style,
    errors,
    isTouched,
    title,
    leftIconOnPress,
    rightIconOnPress,
    leftIconSize,
    rightIconSize,
    leftIconColor,
    rightIconName,
    leftIconName,
    rightIconColor,
    ...rest
  } = props;

  const { Colors } = useTheme();
  const { width } = getDimensions();

  return (
    <>
      <Card
        style={style}
        mode="text-field"
        leftIconOnPress={leftIconOnPress}
        rightIconOnPress={rightIconOnPress}
        leftIconSize={leftIconSize}
        rightIconSize={rightIconSize}
        leftIconColor={leftIconColor}
        rightIconName={rightIconName}
        leftIconName={leftIconName}
        rightIconColor={rightIconColor}
      >
        <View style={styles.cardTitle}>
          <Text preset="cardTitle" text={title} />
        </View>
        <TextField preset="cardSubtitle" placeholder={placeholder} {...rest} />
      </Card>
      {errors && isTouched ? (
        <Text
          preset="cardTitle"
          style={{
            ...styles.errorField,
            width: width * 0.87,
            color: Colors.red3,
          }}
          text={"* " + errors}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  errorField: {
    alignSelf: "center",
    textAlign: "right",
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
});
