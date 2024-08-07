import format from "date-fns/format";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal, TimePickerModal, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { getDimensions, useTheme } from "../../theme";
import { Card, Container, Space, Text } from "../common";

interface TimePickerInputProps {
  withTime?: boolean;
  title: string;
  date: Date;
  errors?: string | undefined;
  isTouched?: boolean;
  disabled?: boolean;
  onChange?: (dateString: string) => void;
}
registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select period",
  notAccordingToDateFormat: inputFormat => `Date format must be ${inputFormat}`,
  mustBeHigherThan: date => `Must be later then ${date}`,
  mustBeLowerThan: date => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) => `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
});

export function TimePickerFieldCard(props: TimePickerInputProps) {
  const { onChange, errors, isTouched, date, title, withTime = true, disabled = false } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setIsDatePickerOpen(false);
    setIsTimePickerOpen(false);
  }, [setIsDatePickerOpen]);

  const onConfirmDatePicker = useCallback(
    ({ date }: { date: CalendarDate }) => {
      setIsDatePickerOpen(false);
      const _date = date ? date.toISOString() : "";
      onChange && onChange(_date);
    },
    [onChange]
  );

  const onConfirmTimePicker = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setIsTimePickerOpen(false);
      const newDate = date;
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange && onChange(newDate.toISOString());
    },
    [date, onChange]
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
  const handleSetFocus = () => {
    if (!withTime) {
      setIsDatePickerOpen(true);
    }
  };

  const titleTextPreset = disabled ? "cardTitle-disabled" : "cardTitle";
  const subTitleTextPreset = disabled ? "cardSubtitle-disabled" : "cardSubtitle";

  return (
    <>
      <Card mode="text-field" onPress={handleSetFocus} disabled={disabled}>
        <Text preset={titleTextPreset} text={title} />
        <Space size="tiny" />
        <Container direction="row" justifyContent="space-between">
          <TouchableOpacity
            disabled={disabled}
            style={{
              flex: 1,
            }}
            onPress={() => setIsDatePickerOpen(true)}
          >
            <Text preset={subTitleTextPreset} style={{ fontWeight: "700", color: disabled ? Colors.disabledText : Colors.brandPrimary }} text={format(date, "MM/dd/yyyy")} />
          </TouchableOpacity>
          {withTime ? (
            <TouchableOpacity
              disabled={disabled}
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
              onPress={() => setIsTimePickerOpen(true)}
            >
              <Text preset={subTitleTextPreset} style={{ fontWeight: "700", color: disabled ? Colors.disabledText : Colors.brandPrimary }} text={format(date, "hh:mm aa")} />
            </TouchableOpacity>
          ) : null}
        </Container>
      </Card>
      {errors && isTouched ? (
        <Text
          preset={titleTextPreset}
          style={{
            ...styles.errorField,
            width: width * 0.87,
            color: Colors.red3,
          }}
          text={"* " + errors}
        />
      ) : null}
      <PaperProvider theme={theme}>
        <TimePickerModal
          visible={isTimePickerOpen}
          onDismiss={onDismiss}
          onConfirm={onConfirmTimePicker}
          hours={date.getHours()} // default: current hours
          minutes={date.getMinutes()} // default: current minutes
          label="Select time" // optional, default 'Select time'
          uppercase={false} // optional, default is true
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
          locale="en" // optional, default is automically detected by your system
          // keyboardIcon="keyboard-outline" // optional, default is "keyboard-outline"
          // clockIcon="clock-outline" // optional, default is "clock-outline"
        />
        <DatePickerModal date={date} mode="single" visible={isDatePickerOpen} onDismiss={onDismiss} onConfirm={onConfirmDatePicker} locale={"en"} dateMode={"start"} />
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
