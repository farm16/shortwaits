import { useTheme } from "@shortwaits/shared-ui";
import { useRef } from "react";
import { Theme } from "react-native-calendars/src/types";

export function useCalendarTheme() {
  const { Colors } = useTheme();
  const theme = useRef<Theme>({
    // arrowColor: Colors.brandSecondary,
    // disabledArrowColor: Colors.disabledText,
    // selectedDayBackgroundColor: Colors.brandPrimary3,
    // todayBackgroundColor: Colors.brandPrimary,
    // textSectionTitleColor: "rgb(77, 77, 77)", //Colors.text,
    // todayTextColor: Colors.brandSecondary,
    // todayButtonTextColor: Colors.brandSecondary,
    // todayButtonFontWeight: "700",
    // agendaDayTextColor: Colors.text,
    textDayStyle: {
      color: Colors.text,
    },
    dayTextColor: Colors.subText,
    calendarBackground: Colors.lightBackground,
    todayBackgroundColor: Colors.white,
    todayTextColor: Colors.text,
  });

  return theme.current;
}
