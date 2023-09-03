import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";

import { useTheme } from "../../../theme";
import { Switch, Button, Container, Text, TimeRangeText } from "../../../components";
import { BusinessWeekDaysType, WeekDayTimeRangeType, WeekDayType } from "@shortwaits/shared-lib";

interface DayCardProps {
  day: BusinessWeekDaysType;
  startTime: number;
  endTime: number;
  isActive: boolean;
  allowHours: boolean;
  onHourChange: (dayRecord: WeekDayType) => void;
  onDayChange: (dayRecord: WeekDayType) => void;
}

/**
 * @todo
 * We are only supporting 1 set of time range in a day ** **FOR NOW
 */
const ScheduleCardComponent: React.FC<DayCardProps> = props => {
  const { day, startTime, endTime, isActive, allowHours, onDayChange, onHourChange } = props;
  const { Colors } = useTheme();

  const handleOnDayChange = ({ day, startTime, endTime, isActive }) => {
    const dayRecord = {
      [day]: [{ startTime, endTime, isActive }],
    };
    onDayChange(dayRecord);
  };

  const handleOnHourChange = ({ day, startTime, endTime, isActive }) => {
    const dayRecord = {
      [day]: [{ startTime, endTime, isActive }],
    };
    onHourChange(dayRecord);
  };

  return (
    <View
      style={{
        ...styles.container,
        borderBottomColor: Colors.backgroundOverlay,
      }}
    >
      {allowHours ? (
        <View style={styles.subContainer1}>
          <Button
            preset="none"
            style={{
              alignItems: "flex-start",
            }}
            disabled={!isActive}
            onPress={() => handleOnHourChange({ day: day, startTime, endTime, isActive })}
          >
            <Container direction="row" style={{ alignItems: "center" }}>
              <Text
                preset="none"
                style={{
                  ...styles.weekDay,
                  color: isActive ? Colors.text : Colors.disabledText,
                }}
                text={day}
              />
              <Icon name="pencil" color={isActive ? Colors.brandSecondary : Colors.disabledText} size={20} />
            </Container>
            <TimeRangeText disabled={!isActive} startTime={startTime} endTime={endTime} />
          </Button>
        </View>
      ) : null}
      <View style={styles.subContainer2}>
        <Switch
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={() => {
            handleOnDayChange({ day: day, startTime, endTime, isActive: !isActive });
          }}
          value={isActive}
        />
      </View>
    </View>
  );
};

export const ScheduleCard = React.memo(ScheduleCardComponent);

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
