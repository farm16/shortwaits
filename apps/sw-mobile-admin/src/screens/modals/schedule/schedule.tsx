import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  WeekDayTimeRangeType,
  BusinessWeekDaysType,
  WEEKDAYS,
  WEEKDAYS_ARR,
  WeekHoursType,
  WeekDayType,
} from "@shortwaits/shared-lib";
import { Alert, View } from "react-native";

import {
  BottomSheet,
  BottomSheetType,
  Button,
  FormContainer,
  IconButton,
  LeftChevronButton,
  Screen,
  Space,
  Text,
  useBottomSheet,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { ScheduleCard } from "./schedule-card";
import { SelectTimeRange, SelectTimeRangeProps } from "./select-time-range";
import { scheduleConfigs } from "./schedule-config";
import { setBusinessAllHours, useBusiness } from "../../../store";

export type DayType = WeekDayTimeRangeType & {
  name: BusinessWeekDaysType;
};

export const ScheduleModal: FC<ModalsScreenProps<"schedule-modal-screen">> = ({ navigation, route }) => {
  const {
    disabledDays = [],
    allowCloseAll = true,
    hours,
    days = WEEKDAYS_ARR,
    allowHours = true,
    headerTitle = "Schedule",
    closeOnSubmit = true,
    onSubmit,
  } = route.params;
  const [currentDays, setCurrentDays] = useState<BusinessWeekDaysType[]>(days);
  const [currentWeekHours, setCurrentWeekHours] = useState<WeekHoursType>(hours);
  const [selectedWeekDay, setSelectedWeekDay] = useState<BusinessWeekDaysType>(null);
  const dispatch = useDispatch();
  const [isBusinessClosed, setIsBusinessClosed] = useState(true);
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {allowCloseAll ? (
            <IconButton
              withMarginRight
              onPress={() => {
                Alert.alert(
                  `${isBusinessClosed ? "Enable" : "Disable"} all hours`,
                  "This will affect all your working hours, Are you sure you want to proceed?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        setCurrentWeekHours(_weekHours => {
                          const _hours = { ..._weekHours };
                          Object.keys(_hours).forEach(day => {
                            _hours[day][0].isActive = isBusinessClosed;
                          });
                          return _hours;
                        });
                        setIsBusinessClosed(isClosed => !isClosed);
                      },
                    },
                  ]
                );
              }}
              iconType={isBusinessClosed ? "open-business" : "closed-business"}
            />
          ) : null}
        </View>
      ),
    });
    return () => console.log(" bye bye schedule modal");
  }, [allowCloseAll, dispatch, headerTitle, isBusinessClosed, navigation]);

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

  const renderCurrentDays = useCallback(() => {
    return currentDays.map((day, _index) => {
      return (
        <ScheduleCard
          key={day}
          /**
           * ...business?.hours[day][0]
           * => we set hours as an arr,
           * we will support multiple hours
           * in a day ex. 8am-10am & 1pm-4pm.
           * for now we only use 1 parameter
           * which is why we default to [0].
           */
          day={day}
          allowHours={allowHours}
          startTime={currentWeekHours[day][0]?.startTime}
          endTime={currentWeekHours[day][0]?.endTime}
          isActive={currentWeekHours[day][0]?.isActive}
          onHourChange={dayHours => {
            handleDayHoursPress(Object.keys(dayHours)[0] as BusinessWeekDaysType);
          }}
          onDayChange={dayHours => {
            console.log(dayHours);
            setCurrentWeekHours(_weekHours => {
              return { ..._weekHours, ...dayHours };
            });
          }}
        />
      );
    });
  }, [allowHours, currentDays, currentWeekHours, handleDayHoursPress]);

  return (
    <React.Fragment>
      <FormContainer
        footer={
          <Button
            text="save"
            onPress={() => {
              onSubmit(currentWeekHours);
              if (closeOnSubmit) navigation.goBack();
            }}
          />
        }
      >
        {renderCurrentDays()}
      </FormContainer>
      <BottomSheet
        onClose={() => {
          setSelectedWeekDay(null);
        }}
        snapPointsLevel={7}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
      >
        {selectedWeekDay ? (
          <SelectTimeRange
            day={selectedWeekDay}
            weekHours={currentWeekHours}
            onDone={dayHours => {
              setCurrentWeekHours(_weekHours => {
                return { ..._weekHours, ...dayHours };
              });
              handleBottomSheet.close();
            }}
          />
        ) : null}
      </BottomSheet>
    </React.Fragment>
  );
};
