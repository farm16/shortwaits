import React, { FC, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BusinessWeekDaysType, WEEKDAYS, WeekDayType, WeekHoursType } from "@shortwaits/shared-lib";
import { useDispatch } from "react-redux";

import { Text, MultiSlider, Space, TimeRangeText, Button } from "../../../components";
import { getDimensions } from "../../../theme";
import { setBusinessDayHours, useBusiness } from "../../../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface SelectTimeRangeProps {
  day: BusinessWeekDaysType;
  weekHours: WeekHoursType;
  onHourChange?: (weekHours: WeekHoursType) => void;
  onDone?: (weekHours: WeekHoursType) => void;
}
const getFullDayString = (day?: string): string => {
  return day ? WEEKDAYS[day] : "";
};

export const SelectTimeRange: FC<SelectTimeRangeProps> = props => {
  const { day, weekHours, onHourChange, onDone } = props;
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 0]);

  const handleOnValuesChange = (values: [number, number]) => {
    if (onHourChange) {
      onHourChange({
        ...weekHours,
        [day]: [
          {
            isActive: weekHours[day][0]?.isActive ?? false,
            startTime: values[0],
            endTime: values[1],
          },
        ],
      });
    }
    setTimeRange(values);
  };

  const handleOnDone = () => {
    if (onDone) {
      onDone({
        ...weekHours,
        [day]: [
          {
            isActive: weekHours[day][0]?.isActive ?? false,
            startTime: timeRange[0],
            endTime: timeRange[1],
          },
        ],
      });
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <Space />
      <Text text={getFullDayString(day)} preset="title2" />
      <Space />
      <TimeRangeText
        preset="title"
        startTime={weekHours[day][0]?.startTime ?? 0}
        endTime={weekHours[day][0]?.endTime ?? 0}
      />
      <Space size="large" />
      <MultiSlider
        values={[weekHours[day][0]?.startTime ?? 0, weekHours[day][0]?.endTime ?? 0]}
        onValuesChange={(values: [number, number]) => {
          handleOnValuesChange(values);
        }}
      />
      <Space size="small" />
      <Button
        preset="primary"
        style={{
          marginTop: "auto",
        }}
        text="Save"
        onPress={() => {
          handleOnDone();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
