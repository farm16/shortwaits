import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Switch, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { getDimensions, useTheme } from "../../../theme";
import { Button, Container, Text, TimeRangeText } from "../../../components";
import { setBusinessDayActivity } from "../../../redux";
import { ScheduleModalType } from "../../../navigation";
import { DayType } from "./schedule";

interface DayCardProps {
  type: ScheduleModalType;
  day: DayType;
  handlePress: (day: DayType["name"]) => void;
}
/**
 * @todo
 * We are only supporting 1 set of time range in a day ** **FOR NOW
 */
export const ScheduleCard = ({ day, handlePress, type }: DayCardProps) => {
  const { width } = getDimensions();
  const { Colors } = useTheme();

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
            alignItems: "flex-start",
          }}
          disabled={!isActive}
          onPress={() => handlePress(name)}
        >
          <Container direction="row" style={{ alignItems: "center" }}>
            <Text
              preset="none"
              style={{
                ...styles.weekDay,
                color: isActive ? Colors.text : Colors.disabledText,
              }}
              text={name}
            />
            <Icon
              name="pencil"
              color={isActive ? Colors.brandSecondary : Colors.disabledText}
              size={20}
            />
          </Container>
          <TimeRangeText
            disabled={!isActive}
            startTime={startTime}
            endTime={endTime}
          />
        </Button>
      </View>
      <View style={styles.subContainer2}>
        <Switch
          style={{ marginLeft: "auto" }}
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={() => {
            dispatch(setBusinessDayActivity(day.name));
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
