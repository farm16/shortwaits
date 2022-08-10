import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Switch, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  BusinessDayTimeRangeType,
  BusinessWeekDaysType,
} from "@shortwaits/shared-types";

import { getDimensions, useTheme } from "../../../theme";
import { Button, Text, TimeRangeText } from "../../../components";
import { useBusiness } from "../../../redux";
import { ScheduleModalType } from "../../../navigation";
import { scheduleConfigs } from "./schedule-config";

interface DayCardProps {
  type: ScheduleModalType;
  day: BusinessDayTimeRangeType & { name: BusinessWeekDaysType };
  handlePress?: any;
}
/**
 * @todo
 * We are only supporting 1 set of time range in a day ** **FOR NOW
 */
export const ScheduleCard = ({ day, handlePress, type }: DayCardProps) => {
  const { width } = getDimensions();
  const { Colors } = useTheme();
  const { setDayActivity } = scheduleConfigs[type];
  const { startTime, endTime, isActive, name } = day;
  const dispatch = useDispatch();

  return (
    <View
      style={{
        ...styles.container,
        width: width * 0.87,
        borderBottomColor: Colors.backgroundOverlay,
      }}
    >
      <View style={styles.subContainer1}>
        <Button
          preset="none"
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          disabled={!isActive}
          onPress={() => handlePress(day)}
        >
          <Text
            preset="none"
            style={{
              ...styles.weekDay,
              color: isActive ? Colors.gray : Colors.lightGray,
            }}
            text={name}
          />
          <Icon
            name="pencil"
            color={isActive ? Colors.brandPrimary : Colors.lightGray}
            size={20}
          />
        </Button>
        <TimeRangeText
          disabled={!isActive}
          startTime={startTime}
          endTime={endTime}
        />
      </View>
      <View style={styles.subContainer2}>
        <Switch
          style={{ marginLeft: "auto" }}
          trackColor={{ false: Colors.red1, true: Colors.brandPrimary1 }}
          thumbColor={isActive ? Colors.brandPrimary2 : Colors.red2}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={() => {
            dispatch(setDayActivity(day.name));
          }}
          value={isActive}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingVertical: 10,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  subContainer1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subContainer2: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  weekDay: {
    fontSize: 27,
    textTransform: "lowercase",
    marginRight: 10,
  },
  time: {
    fontSize: 12,
    marginEnd: 10,
    textTransform: "uppercase",
  },
});
