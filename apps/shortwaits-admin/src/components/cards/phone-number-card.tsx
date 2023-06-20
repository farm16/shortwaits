import React, { useRef } from "react";
import { StyleSheet } from "react-native";

import { getDimensions, useTheme } from "../../theme";
import { Card, CardProps, Space, Text, TextFieldProps } from "../common";
import PhoneInput from "react-native-phone-input";

type PhoneNumberProps = {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
  disabled?: boolean;
  initialValue?: string;
  isValid?: (isValid: boolean) => void;
} & TextFieldProps &
  Partial<CardProps>;

export const PhoneNumberCard = (props: PhoneNumberProps) => {
  const {
    initialValue,
    errors,
    isTouched,
    title,
    isValid,
    disabled = false,
    onChangeText,
  } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();

  const phoneNumber = useRef<PhoneInput>(null);

  return (
    <>
      <Card mode="text-field">
        <Text preset="cardTitle" text={title} />
        <PhoneInput
          disabled={disabled}
          ref={phoneNumber}
          onChangePhoneNumber={_number => {
            isValid && isValid(phoneNumber.current?.isValidNumber());
            onChangeText(phoneNumber.current?.getValue());
          }}
          style={{ marginTop: 8 }}
          textStyle={{ height: 16 }}
          initialCountry={"us"}
          //   initialValue={initialValue}
          textProps={{
            placeholder: "Enter a phone number...",
          }}
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
};
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
