import { useRef } from "react";
import { Pressable, StyleSheet } from "react-native";

import PhoneInput, { ReactNativePhoneInputProps } from "react-native-phone-input";
import { getDimensions, useTheme } from "../../theme";
import { Card, CardProps, Space, Text } from "../common";

type PhoneNumberProps = Omit<CardProps, "mode"> & {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
  placeholder?: string;
  rightIconName?: string;
  disabled?: boolean;
  initialValue?: string;
  isValid?: (isValid: boolean) => void;
  onChangeText: (text: string) => void;
} & ReactNativePhoneInputProps;

export const PhoneNumberCard = (props: PhoneNumberProps) => {
  const {
    initialValue,
    rightIconColor,
    rightIconName,
    rightIconSize = "large",
    errors,
    isTouched,
    isValid,
    rightIconOnPress,
    title,
    withTopBorder,
    disabled = false,
    onChangeText,
    ...rest
  } = props;

  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  const { width } = getDimensions();

  const phoneNumberRef = useRef<PhoneInput>(null);

  const handleSetFocus = () => {
    if (phoneNumberRef?.current) {
      phoneNumberRef?.current.focus();
    }
  };

  return (
    <>
      <Card
        {...rest}
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
          <Space size="tiny" />
        </Pressable>
        <PhoneInput
          disabled={disabled}
          ref={phoneNumberRef}
          onChangePhoneNumber={_number => {
            isValid && isValid(phoneNumberRef?.current?.isValidNumber());
            onChangeText(phoneNumberRef?.current?.getValue());
          }}
          textStyle={textFieldPresets.cardSubtitle}
          autoFormat={true}
          initialCountry={"us"}
          initialValue={initialValue}
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
