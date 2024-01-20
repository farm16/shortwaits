import { noop } from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getDimensions, useTheme } from "../../theme";
import { Card, Space, Text } from "../common";

type PickerSelectFieldCardProps = {
  onChange: (value: string, index: number) => void;
  errors?: any[];
  isTouched?: boolean;
  data: any[];
  title: string;
  placeholder?: string;
  disabled?: boolean;
};
export const PickerSelectFieldCard = (props: PickerSelectFieldCardProps) => {
  const {
    onChange = noop,
    errors,
    isTouched,
    data,
    title,
    placeholder,
    disabled = false,
  } = props;
  const {
    Colors,
    Common: { textPresets },
  } = useTheme();
  const { width } = getDimensions();

  return (
    <>
      <Card mode="text-field">
        <Text preset="cardTitle" text={title ?? ""} />
        <Space size="tiny" />
        <RNPickerSelect
          disabled={disabled}
          placeholder={{ inputLabel: placeholder }}
          style={{
            placeholder: { ...textPresets["cardSubtitle"] },
            inputAndroid: { ...textPresets["cardSubtitle"] },
            inputAndroidContainer: {},
            inputIOS: { ...textPresets["cardSubtitle"] },
            inputIOSContainer: {},
          }}
          onValueChange={onChange}
          items={data}
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
