import React from "react";
import { StyleSheet, View } from "react-native";
import { TextFieldProps, Card, Text, CardIconsProps, Space } from "../common";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";
import { BusinessAvailableCurrenciesType } from "@shortwaits/shared-lib";

import { getDimensions, useTheme } from "../../theme";
import { getCurrencySymbolFromCurrencyType } from "../../utils/currency";

type TextFieldCard = CurrencyInputProps & {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
  disabled?: boolean;
  currencyType: BusinessAvailableCurrenciesType;
  errors: string;
};

const MAX = 10000;

export function CurrencyFieldCard(props: TextFieldCard) {
  const {
    value,
    style,
    errors,
    isTouched,
    title,
    rightIconName,
    onChangeValue,
    currencyType,
    ...rest
  } = props;

  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  const { width } = getDimensions();

  return (
    <>
      <Card mode="text-field">
        <Text preset="cardTitle" text={title} />
        <Space size="tiny" />
        <CurrencyInput
          style={textFieldPresets.cardSubtitle}
          placeholderTextColor={Colors.subText}
          prefix={getCurrencySymbolFromCurrencyType(currencyType)}
          signPosition="beforePrefix"
          delimiter=","
          precision={2}
          separator="."
          onChangeValue={onChangeValue}
          value={value}
          maxValue={MAX}
          {...rest}
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
