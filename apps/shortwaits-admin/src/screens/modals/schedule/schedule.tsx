import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { BusinessWeekDaysType, WEEKDAYS } from "@shortwaits/shared-types";

import {
  BottomSheet,
  BottomSheetType,
  Button,
  LeftArrowButton,
  LeftChevronButton,
  Screen,
  Space,
  useBottomSheet,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { ScheduleCard } from "./schedule-card";
import { SelectTimeRange } from "./select-time-range";
import { scheduleConfigs } from "./schedule-config";
import { setBusinessEveryDayActivity, useBusiness } from "../../../redux";

const getFullDayString = (day?: string): string => {
  return day ? WEEKDAYS[day] : "";
};

export const ScheduleModal: FC<ModalsScreenProps<"schedule-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { type } = route.params;
  const [selectedDay, setSelectedDay] = useState<BusinessWeekDaysType | null>(
    null
  );
  const dispatch = useDispatch();
  const { Colors } = useTheme();

  // const {
  //   mode,
  //   permissions
  //   keys: { businessKey, businessDefaultDataKey }
  // } = scheduleConfigs[type]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: scheduleConfigs[type].headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <Button
          preset="headerLink"
          onPress={() => dispatch(setBusinessEveryDayActivity(false))}
        >
          <Icon name="lock-open" color={Colors.brandPrimary} size={22} />
        </Button>
      ),
    });
    return () => console.log(" bye bye schedule modal");
  }, [Colors.brandPrimary, dispatch, navigation, type]);

  const business = useBusiness();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  const showModal = useCallback(
    (day: BusinessWeekDaysType | null) => {
      setSelectedDay(day);
      handleBottomSheet.expand();
    },
    [handleBottomSheet]
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const days = Object.keys(WEEKDAYS);

  return (
    <Screen
      preset="scroll"
      withInset={false}
      style={{ flex: 1, alignItems: "center" }}
    >
      <Space />
      {days.map((day: string, _index) => (
        <ScheduleCard
          key={day}
          type={type}
          day={{ ...business?.hours[day][0], name: day }}
          handlePress={showModal}
        />
      ))}
      <Space />
      <BottomSheet
        snapLevels={1}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
      >
        {/* <SelectTimeRange day={day} title={getFullDayString(day)} /> */}
      </BottomSheet>
    </Screen>
  );
};
