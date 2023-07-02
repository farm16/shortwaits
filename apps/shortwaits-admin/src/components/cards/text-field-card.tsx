import React from "react";
import { StyleSheet } from "react-native";

import { getDimensions, useTheme } from "../../theme";
import {
  TextField,
  TextFieldProps,
  Card,
  Text,
  CardProps,
  Space,
} from "../common";

type TextFieldCard = {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
  disabled?: boolean;
} & TextFieldProps &
  Partial<CardProps>;

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
    disabled = false,
    ...rest
  } = props;

  const { Colors } = useTheme();
  const { width } = getDimensions();

  return (
    <>
      <Card
        mode="text-field"
        // disabled={disabled}
        leftIconOnPress={leftIconOnPress}
        rightIconOnPress={rightIconOnPress}
        leftIconSize={leftIconSize}
        rightIconSize={rightIconSize}
        leftIconColor={leftIconColor}
        rightIconName={rightIconName}
        leftIconName={leftIconName}
        rightIconColor={rightIconColor}
      >
        <Text preset="cardTitle" text={title} />
        <Space size="tiny" />
        <TextField preset="cardSubtitle" placeholder={placeholder} {...rest} />
      </Card>
      {errors && isTouched ? (
        <Text preset="error" text={"* " + errors} />
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
