import React, { useRef } from "react";
import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { TextField, TextFieldProps, Card, Text, CardProps, Space } from "../common";
import { getDimensions, useTheme } from "../../theme";

type TextFieldCard = {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
  rightIconColor?: string;
  rightIconSize?: number;
  rightIconOnPress?: () => void;
  disabled?: boolean;
} & TextFieldProps &
  Partial<CardProps>;

export function TextFieldCard(props: TextFieldCard) {
  const {
    placeholder,
    errors = "",
    isTouched,
    rightIconColor,
    rightIconName,
    rightIconSize = 23,
    rightIconOnPress,
    title,
    ...rest
  } = props;

  const textInputRef = useRef(null);
  const { Colors } = useTheme();
  const { width } = getDimensions();

  const handleSetFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <>
      <Card mode="text-field">
        <Pressable onPress={handleSetFocus}>
          <Text preset="cardTitle" text={title} />
          <Space size="tiny" />
        </Pressable>
        <TextField preset="cardSubtitle" ref={textInputRef} placeholder={placeholder} {...rest} />
        {rightIconName ? (
          <TouchableOpacity
            style={{
              right: 0,
              bottom: 0,
              paddingHorizontal: 16,
              paddingVertical: 8,
              position: "absolute",
            }}
            onPress={rightIconOnPress}
          >
            <Icon size={rightIconSize} color={rightIconColor} name={rightIconName} />
          </TouchableOpacity>
        ) : null}
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
