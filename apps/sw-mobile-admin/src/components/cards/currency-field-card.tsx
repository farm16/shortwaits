import React, { useRef } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";
import { BusinessAvailableCurrenciesType } from "@shortwaits/shared-lib";

import { Card, Text, CardProps, Space } from "../common";
import { getDimensions, useTheme } from "../../theme";
import { getCurrencySymbolFromCurrencyType } from "../../utils/currency";

type TextFieldCardType = Omit<CardProps, "mode"> & {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
  placeholder?: string;
  currencyType?: BusinessAvailableCurrenciesType;
} & CurrencyInputProps;

const MAX = 10000;

export function CurrencyFieldCard(props: TextFieldCardType) {
  const {
    value,
    style,
    errors,
    isTouched,
    onChangeValue,
    currencyType,
    rightIconColor,
    rightIconName,
    rightIconSize = "large",
    rightIconOnPress,
    title,
    withTopBorder,
    editable,
    ...rest
  } = props;

  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  const textInputRef = useRef<CurrencyInput>(null);
  const { width } = getDimensions();
  const handleSetFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
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
          {Platform.OS === "ios" && <Space size="tiny" />}
        </Pressable>
        <CurrencyInput
          style={textFieldPresets.cardSubtitle}
          placeholderTextColor={Colors.subText}
          placeholder="0.00"
          prefix={getCurrencySymbolFromCurrencyType(currencyType)}
          signPosition="beforePrefix"
          delimiter=","
          precision={2}
          separator="."
          onChangeValue={onChangeValue}
          value={value}
          maxValue={MAX}
          editable={editable}
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
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
});
