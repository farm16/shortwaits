import React, { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { BusinessWeekDaysType, WEEKDAYS } from "@shortwaits/shared-types";
import { useDispatch } from "react-redux";

import { Text, MultiSlider, Space, TimeRangeText } from "../../../components";
import { getDimensions } from "../../../theme";
import { setBusinessDayHours, useBusiness } from "../../../store";

interface SelectTimeRangeProps {
  day: BusinessWeekDaysType;
}
const getFullDayString = (day?: string): string => {
  return day ? WEEKDAYS[day] : "";
};

export const SelectTimeRange: FC<SelectTimeRangeProps> = ({ day }) => {
  const business = useBusiness();
  const dispatch = useDispatch();
  const dayHours = useMemo(
    () => business?.hours[day][0] ?? null,
    [business?.hours, day]
  );

  return (
    <View
      style={{
        ...styles.container,
        width: getDimensions(90).width,
      }}
    >
      <Space />
      <Text text={getFullDayString(day)} preset="title2" />
      <Space />
      <TimeRangeText
        preset="title"
        startTime={dayHours?.startTime ?? 0}
        endTime={dayHours?.endTime ?? 0}
      />
      <Space size="small" />
      <MultiSlider
        values={[dayHours?.startTime ?? 0, dayHours?.endTime ?? 0]}
        onValuesChange={(values: [number, number]) => {
          dispatch(setBusinessDayHours({ values, name: day }));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
