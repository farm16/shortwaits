import React, { useRef } from "react";
import { StyleSheet, Pressable, TextInputProps, TextInput as RnTextInput, Platform } from "react-native";

import { TextField, Card, Text, CardProps, Space } from "../common";
import { getDimensions, useTheme } from "../../theme";

type TextFieldCardType = Omit<CardProps, "mode"> & {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
  placeholder?: string;
} & TextInputProps;

export function TextFieldCard(props: TextFieldCardType) {
  const {
    placeholder,
    errors = "",
    isTouched,
    rightIconColor,
    rightIconName,
    rightIconSize = "large",
    rightIconOnPress,
    title,
    withTopBorder,
    ...rest
  } = props;

  const textInputRef = useRef<RnTextInput>(null);
  const { Colors } = useTheme();
  const { width } = getDimensions();

  const handleSetFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <>
      <Card
        mode="text-field"
        rightIconSize={rightIconSize}
        rightIconName={rightIconName}
        style={
          withTopBorder
            ? {
                borderTopWidth: 1.5,
                borderTopColor: Colors.inputBackground,
              }
            : undefined
        }
      >
        <Pressable onPress={handleSetFocus}>
          <Text preset="cardTitle" text={title} />
          {Platform.OS === "ios" && <Space size="tiny" />}
        </Pressable>
        <TextField
          {...rest}
          // style={{ backgroundColor: "red" }}
          preset="cardSubtitle"
          ref={textInputRef}
          placeholder={placeholder}
        />
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
});
