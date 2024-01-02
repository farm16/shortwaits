import React, { useRef } from "react";
import { Platform, Pressable, TextInput as RnTextInput, StyleSheet, TextInputProps } from "react-native";
import { getDimensions, useTheme } from "../../theme";
import { Card, CardProps, Space, Text, TextField } from "../common";

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
    multiline,
    disabled,
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
        rightIconOnPress={rightIconOnPress}
        rightIconColor={rightIconColor}
        disabled={disabled}
        style={[
          withTopBorder
            ? {
                borderTopWidth: 1.5,
                borderTopColor: Colors.inputBackground,
              }
            : {},
          {
            height: multiline ? "auto" : 70,
            paddingBottom: multiline ? 16 : 0,
            // alignItems: multiline ? "flex-start" : "center",
          },
        ]}
      >
        <Pressable onPress={handleSetFocus}>
          <Text preset="cardTitle" text={title} />
          {Platform.OS === "ios" && <Space size="tiny" />}
        </Pressable>
        <TextField {...rest} editable={!disabled} multiline={multiline} preset="cardSubtitle" ref={textInputRef} placeholder={placeholder} />
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
