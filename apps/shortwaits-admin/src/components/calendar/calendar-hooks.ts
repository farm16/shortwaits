import { useMemo, useRef } from "react";
import { Platform } from "react-native";
import { Theme } from "react-native-calendars/src/types";
import { useTheme } from "../../theme";

export function useCalendarTheme() {
  const { Colors } = useTheme();
  const theme = useRef<Theme>({
    arrowColor: Colors.brandSecondary,
    selectedDayBackgroundColor: Colors.brandSecondary3,
    todayBackgroundColor: Colors.brandSecondary,
    todayButtonTextColor: Colors.white,
    todayTextColor: Colors.white,
    dayTextColor: Colors.subText,
    textDayStyle: {
      color: Colors.text,
    },
    selectedDayTextColor: Colors.white,
  });

  return theme.current;
}
