import { BusinessAvailableCurrenciesType } from "@shortwaits/shared-lib";
import { useRef } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";
import { getDimensions, useTheme } from "../../theme";
import { getCentsFromDollars, getCurrencySymbolFromCurrencyType, getDollarsFromCents } from "../../utils/currency";
import { Card, CardProps, Space, Text } from "../common";

type TextFieldCardType = Omit<CardProps, "mode"> & {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
  placeholder?: string;
  currencyType?: BusinessAvailableCurrenciesType;
  type?: "cents" | "dollars";
} & CurrencyInputProps;

const MAX = 10000;

export function CurrencyFieldCard(props: TextFieldCardType) {
  const {
    value = 0,
    style,
    errors,
    isTouched,
    onChangeValue,
    currencyType = "USD",
    rightIconColor,
    rightIconName,
    rightIconSize = "large",
    rightIconOnPress,
    title,
    withTopBorder,
    disabled,
    ...rest
  } = props;

  const { Colors } = useTheme();

  const textInputRef = useRef<CurrencyInput>(null);
  const { width } = getDimensions();
  const handleSetFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleOnChangeValue = (value: number) => {
    onChangeValue && onChangeValue(getCentsFromDollars(value));
  };
  const titleTextPreset = disabled ? "cardTitle-disabled" : "cardTitle";

  return (
    <>
      <Card {...rest} disabled={disabled} mode="text-field" rightIconSize={rightIconSize} rightIconName={rightIconName}>
        <Pressable onPress={handleSetFocus}>
          <Text preset={titleTextPreset} text={title} />
          {Platform.OS === "ios" && <Space size="tiny" />}
        </Pressable>
        <CurrencyInput
          ref={textInputRef}
          style={{
            color: disabled ? Colors.disabledText : Colors.subText,
            fontWeight: "400",
            paddingTop: 4,
            paddingBottom: 0,
            paddingLeft: 0,
          }}
          placeholderTextColor={Colors.subText}
          placeholder="0.00"
          prefix={getCurrencySymbolFromCurrencyType(currencyType)}
          signPosition="beforePrefix"
          delimiter=","
          precision={2}
          separator="."
          onChangeValue={handleOnChangeValue}
          value={getDollarsFromCents(value as number)}
          maxValue={MAX}
          editable={!disabled}
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
