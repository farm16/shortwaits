import { BusinessWeekDaysType, WEEKDAYS_ARR, WeekHoursType } from "@shortwaits/shared-lib";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";

import { BackButton, BottomSheet, BottomSheetType, Button, FormContainer, IconButton, useBottomSheet } from "@shortwaits/shared-ui";
import { cloneDeep } from "lodash";
import { ModalsScreenProps } from "../../../navigation";
import { ScheduleCard } from "./schedule-card";
import { SelectTimeRange } from "./select-time-range";

/**
 * ...business?.hours[day][0]
 * => we set hours as an arr,
 * we will support multiple hours
 * in a day ex. 8am-10am & 1pm-4pm.
 * for now we only use 1 parameter
 * which is why we default to [0].
 */

export function ScheduleModal(props: ModalsScreenProps<"schedule-modal-screen">) {
  const { disabledDays = [], allowCloseAll = true, hours, days = WEEKDAYS_ARR, allowHours = true, headerTitle = "Schedule", closeOnSubmit = true, onSubmit } = props.route.params;

  const [currentWeekHours, setCurrentWeekHours] = useState<WeekHoursType>(hours);
  const [selectedWeekDay, setSelectedWeekDay] = useState<BusinessWeekDaysType>(null);
  const [isBusinessClosed, setIsBusinessClosed] = useState(false);

  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  useEffect(() => {
    const toggleBusinessHours = () => {
      setCurrentWeekHours(prevWeekHours => {
        const newWeekHours = cloneDeep(prevWeekHours);
        days.forEach(day => {
          newWeekHours[day][0].isActive = isBusinessClosed;
        });
        return newWeekHours;
      });
      setIsBusinessClosed(isClosed => !isClosed);
    };
    const handleEnableDisableAllHours = () => {
      Alert.alert(`${isBusinessClosed ? "Enable" : "Disable"} all hours`, "This will affect all your working hours. Are you sure you want to proceed?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            toggleBusinessHours();
          },
        },
      ]);
    };
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
          {allowCloseAll && <IconButton withMarginRight onPress={() => handleEnableDisableAllHours()} iconType={isBusinessClosed ? "open-business" : "closed-business"} />}
        </View>
      ),
    });
  }, [allowCloseAll, days, headerTitle, isBusinessClosed, navigation]);

  const handleDayHoursPress = useCallback(
    (weekDay: BusinessWeekDaysType) => {
      setSelectedWeekDay(weekDay);
      handleBottomSheet.expand();
    },
    [handleBottomSheet]
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Render day cards
  const renderCurrentDays = useCallback(() => {
    return days.map(day => (
      <ScheduleCard
        key={day}
        day={day}
        allowHours={allowHours}
        startTime={currentWeekHours[day][0]?.startTime}
        endTime={currentWeekHours[day][0]?.endTime}
        isActive={currentWeekHours[day][0]?.isActive}
        onHourChange={dayHours => handleDayHoursPress(Object.keys(dayHours)[0] as BusinessWeekDaysType)}
        onDayChange={dayHours => setCurrentWeekHours(prevWeekHours => ({ ...prevWeekHours, ...dayHours }))}
      />
    ));
  }, [allowHours, currentWeekHours, days, handleDayHoursPress]);

  return (
    <React.Fragment>
      <FormContainer
        footer={
          <Button
            text="Save"
            onPress={() => {
              onSubmit(currentWeekHours);
              if (closeOnSubmit) {
                navigation.goBack();
              }
            }}
          />
        }
      >
        {renderCurrentDays()}
      </FormContainer>
      <BottomSheet onClose={() => setSelectedWeekDay(null)} snapPointsLevel={7} onChange={handleSheetChanges} ref={bottomSheetRef}>
        {selectedWeekDay && (
          <SelectTimeRange
            day={selectedWeekDay}
            weekHours={currentWeekHours}
            onDone={dayHours => {
              setCurrentWeekHours(prevWeekHours => ({ ...prevWeekHours, ...dayHours }));
              handleBottomSheet.close();
            }}
          />
        )}
      </BottomSheet>
    </React.Fragment>
  );
}
