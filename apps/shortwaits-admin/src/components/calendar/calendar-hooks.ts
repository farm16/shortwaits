import { useMemo } from "react";
import { Platform } from "react-native";
import { Theme } from "react-native-calendars/src/types";
import { useTheme } from "../../theme";

export function useCalendarTheme() {
  const { Colors } = useTheme();
  return useMemo<Theme>(() => {
    return {
      // arrows
      arrowStyle: { padding: 0 },
      // knob
      // expandableKnobColor: Colors.brandSecondary,
      // month
      textMonthFontSize: 16,
      // textMonthFontFamily: "HelveticaNeue",
      textMonthFontWeight: "bold" as const,
      // day names
      textDayHeaderFontSize: 12,
      // textDayHeaderFontFamily: "HelveticaNeue",
      textDayHeaderFontWeight: "normal" as const,
      // dates
      // dayTextColor: Colors.brandSecondary,
      textDayFontSize: 18,
      // textDayFontFamily: "HelveticaNeue",
      textDayFontWeight: "500" as const,
      textDayStyle: {
        marginTop: Platform.OS === "android" ? 2 : 4,
      },
      // selected date
      // selectedDayBackgroundColor: Colors.white,
      // disabled date
      textDisabledColor: Colors.lightGray,
      // dot (marked date)
      // dotColor: Colors.brandSecondary,
      // textSectionTitleColor: "white",
      // selectedDotColor: "white",
      textInactiveColor: Colors.lightGray,
      agendaDayTextColor: Colors.gray,
      disabledDotColor: Colors.white,
      dotStyle: {
        marginTop: -2,
      },
      monthTextColor: "red",
      dayTextColor: Colors.brandAccent,
      arrowColor: Colors.brandAccent,
      // selectedDayTextColor: Colors.brandAccent2,

      // todayBackgroundColor: "red",
    };
  }, [Colors.brandAccent, Colors.gray, Colors.lightGray, Colors.white]);
}
