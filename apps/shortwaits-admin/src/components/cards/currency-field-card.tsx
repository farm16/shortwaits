import React from "react";
import { StyleSheet, View } from "react-native";
import CurrencyInput, {
  CurrencyInputProps,
  //   FakeCurrencyInput
} from "react-native-currency-input";

import { useTheme } from "@/theme";
import { TextFieldProps, Card, Text } from "../common";
import { getCurrencySymbolFromCurrencyType } from "@/utils/currency";
import { BusinessAvailableCurrenciesType } from "@shortwaits/shared-types";

interface TextFieldCard
  extends CurrencyInputProps,
    Pick<TextFieldProps, "preset" | "errors"> {
  title: string;
  isTouched?: boolean;
  currencyType: BusinessAvailableCurrenciesType;
}

const VALID = /^[1-9]{1}[0-9]*$/;
const MAX = 10000;

export function CurrencyFieldCard(props: TextFieldCard) {
  const {
    errors,
    isTouched,
    title,
    currencyType,
    value,
    onChangeValue,
    ...rest
  } = props;

  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  return (
    <Card mode="text-field">
      <View style={style.rowContainer}>
        <Text preset="cardTitle" text={title} />
        {errors && isTouched ? (
          <Text
            preset="cardTitle"
            style={{ color: Colors.red3 }}
            text={"* " + errors}
          />
        ) : null}
      </View>
      <CurrencyInput
        style={textFieldPresets.cardSubtitle}
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
  );
}

const style = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
});
