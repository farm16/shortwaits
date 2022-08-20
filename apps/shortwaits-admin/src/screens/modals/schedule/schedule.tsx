import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import {
  BusinessDayTimeRangeType,
  BusinessWeekDaysType,
  WEEKDAYS,
} from "@shortwaits/shared-types";
import { Alert, View } from "react-native";

import {
  BottomSheet,
  BottomSheetType,
  CircleIconButton,
  LeftChevronButton,
  Screen,
  Space,
  Text,
  useBottomSheet,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { ScheduleCard } from "./schedule-card";
import { SelectTimeRange } from "./select-time-range";
import { scheduleConfigs } from "./schedule-config";
import { setBusinessAllHours, useBusiness } from "../../../redux";
import { usePostBusinessHoursMutation } from "../../../services/shortwaits-api";

export type DayType = BusinessDayTimeRangeType & {
  name: BusinessWeekDaysType;
};

export const ScheduleModal: FC<ModalsScreenProps<"schedule-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { type: modalType } = route.params;
  const [selectedDay, setSelectedDay] = useState<BusinessWeekDaysType>(null);
  const dispatch = useDispatch();
  const [isBusinessClosed, setIsBusinessClosed] = useState(true);
  const { Colors } = useTheme();
  const business = useBusiness();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);
  const [postBusinessHours, postBusinessHoursStatus] =
    usePostBusinessHoursMutation();
  useEffect(() => {
    if (postBusinessHoursStatus.isSuccess) {
      Alert.alert("Business hours updated");
    }
  }, [postBusinessHoursStatus.isSuccess]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: scheduleConfigs[modalType].headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <CircleIconButton
            onPress={() => {
              setIsBusinessClosed((_isBusinessClosed) => {
                dispatch(setBusinessAllHours(!_isBusinessClosed));
                return !_isBusinessClosed;
              });
            }}
            iconType={isBusinessClosed ? "closed-business" : "open-business"}
          />
          {/* <CircleIconButton
            text={"save"}
            onPress={() => {
              postBusinessHours({
                businessId: String(business._id),
                payload: { hours: business.hours },
              });
            }}
            iconType="save"
          /> */}
        </View>
      ),
    });
    return () => console.log(" bye bye schedule modal");
  }, [
    Colors.brandPrimary,
    dispatch,
    isBusinessClosed,
    navigation,
    modalType,
    business._id,
    business.hours,
    postBusinessHours,
  ]);

  const handlePress = useCallback(
    (day: BusinessWeekDaysType) => {
      setSelectedDay(day);
      handleBottomSheet.expand();
    },
    [handleBottomSheet]
  );

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const days = Object.keys(WEEKDAYS);
  // console.log(JSON.stringify(business?.hours, null, 2));

  if (postBusinessHoursStatus.isLoading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Screen
      unsafe
      preset="scroll"
      withInset={false}
      style={{ flex: 1, alignItems: "center", paddingTop: 15 }}
    >
      {days.map((day: string, _index) => {
        return (
          <ScheduleCard
            key={day}
            type={modalType}
            /**
             * ...business?.hours[day][0]
             * => we set hours as an arr,
             * we will support multiple hours
             * in a day ex. 8am-10am & 1pm-4pm.
             * for now we only use 1 parameter
             * which is why we default to [0].
             */
            day={{ ...business?.hours[day][0], name: day }}
            handlePress={(_day) => handlePress(_day)}
          />
        );
      })}
      <Space />
      <BottomSheet
        onClose={() => {
          setSelectedDay(null);
        }}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
      >
        {selectedDay ? <SelectTimeRange day={selectedDay} /> : null}
      </BottomSheet>
    </Screen>
  );
};
