import { useRef } from "react";
import { Theme } from "react-native-calendars/src/types";
import { useTheme } from "../../theme";

export function useCalendarTheme() {
  const { Colors } = useTheme();
  const theme = useRef<Theme>({
    arrowColor: Colors.brandSecondary,
    disabledArrowColor: Colors.disabledText,

    selectedDayBackgroundColor: Colors.brandPrimary3,
    todayBackgroundColor: Colors.brandPrimary,

    calendarBackground: Colors.backgroundOverlay,
    backgroundColor: Colors.backgroundOverlay,

    textSectionTitleColor: "rgb(77, 77, 77)", //Colors.text,
    agendaDayTextColor: Colors.text,

    todayTextColor: Colors.brandSecondary,
    todayButtonTextColor: Colors.brandSecondary,
    todayButtonFontWeight: "700",

    dayTextColor: Colors.subText,
    textDayStyle: {
      color: Colors.text,
    },
    selectedDayTextColor: Colors.white,
  });

  return theme.current;
}
