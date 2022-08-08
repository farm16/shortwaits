import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  MultiSlider,
  Space,
  TimeRangeText,
} from "@shortwaits/admin/components";
import { getDimensions, useTheme } from "@shortwaits/admin/theme";
import { BusinessWeekDaysType } from "@shortwaits/shared-types";

interface SelectTimeRangeProps {
  title?: string;
  day?: BusinessWeekDaysType;
}
export const SelectTimeRange = ({ title }: SelectTimeRangeProps) => {
  const { Colors } = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        width: getDimensions(90).width,
      }}
    >
      <Space />
      <Text text={title} preset="title2" />
      <Space />
      <TimeRangeText preset="title" startTime={0} endTime={100} />
      <Space size="small" />
      <MultiSlider
        mode="time"
        values={[0, 100]}
        onValuesChange={(values: number[]) => {}}
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
