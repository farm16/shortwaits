import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal, registerTranslation } from "react-native-paper-dates";
import format from "date-fns/format";

import { Card, Text } from "../common";
import { getDimensions, useTheme } from "../../theme";

interface TimePickerInputProps {
  title: string;
  date: Date;
  errors?: string | undefined;
  isTouched?: boolean;
  onChange?: (dateString: string) => void;
}
registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select period",
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
});

export function TimePickerCardInput(props: TimePickerInputProps) {
  const { onChange, errors, isTouched, date, title } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ date: datePickerModalDate }) => {
      setOpen(false);
      onChange(datePickerModalDate.toISOString());
    },
    [onChange]
  );

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.brandSecondary6,
      accent: Colors.brandAccent,
    },
  };
  return (
    <>
      <Card mode="button" onPress={() => setOpen(true)}>
        <Text preset="cardTitle" text={title} />
        <Text preset="cardSubtitle" text={format(date, "MM/dd/yyyy")} />
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
      <PaperProvider theme={theme}>
        <DatePickerModal
          date={date}
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          onConfirm={onConfirm}
          locale={"en"}
          dateMode={"start"}
        />
      </PaperProvider>
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
