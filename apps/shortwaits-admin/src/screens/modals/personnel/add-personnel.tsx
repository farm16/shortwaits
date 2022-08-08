import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { useTheme } from "@shortwaits/admin/theme";
import {
  Button,
  Screen,
  Card,
  TextField,
  Text,
  Space,
  TextHeaderButton,
} from "@shortwaits/admin/components";
import { CloseButton, UploadProfileImage } from "@shortwaits/admin/components";
import { RootStackParamList } from "@shortwaits/admin/navigation/app-navigator";
import { ScrollView } from "react-native-gesture-handler";

export const AddPersonnelModal = ({
  route: { params },
  navigation,
}: StackScreenProps<RootStackParamList, "modals">) => {
  const { Gutters } = useTheme();
  const { mode = "add", headerTitle, data } = params;

  const personnelModalselectMode: any = {
    add: {
      headerTitle: "add personnel",
      action: "add",
    },
    update: {
      headerTitle: headerTitle,
      action: "update",
    },
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: personnelModalModes[mode].headerTitle,
      headerRight: () => (
        <TextHeaderButton
          onPress={() => {
            // onChange({ businessIndustryTypes: data })
            navigation.goBack();
          }}
          text={personnelModalModes[mode].action}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen preset="fixed" style={{ alignItems: "center" }} unsafe>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UploadProfileImage
          preset="small"
          style={{ alignSelf: "center", marginVertical: 20 }}
        />
        <TextField
          leftIconName="clipboard-account-outline"
          name="name"
          placeholder="john mall"
        />
        <TextField
          leftIconName="email-outline"
          name="email"
          placeholder="jhon_mall@shortwaits.com"
        />
        <TextField
          leftIconName="cellphone"
          name="contact number"
          placeholder="(xxx) xxx-xxxx"
        />
        <Card
          leftIconName="clock-outline"
          rightIconSize="large"
          rightIconName="chevron-right"
          onPress={() =>
            navigation.navigate("modals", {
              screen: "schedule-modal-screen",
              params: {
                headerTitle: "personnel schedule",
                data: sampleScheduleData,
              },
            })
          }
        >
          <View>
            <Text preset="cardTitle" text="work days" />
            <Text
              preset="cardSubtitle"
              style={{ ...Gutters.tinyTPadding }}
              text={"mo - tu - we - th - fr - sa - su"}
            />
          </View>
        </Card>
        <Card
          leftIconName="coffee-outline"
          rightIconSize="large"
          rightIconName="chevron-right"
          onPress={() =>
            navigation.navigate("modals", {
              screen: "schedule-modal-screen",
              params: {
                headerTitle: "break schedule",
                data: sampleScheduleData,
              },
            })
          }
        >
          <View>
            <Text preset="cardTitle" text="break time" />
            <Text
              preset="cardSubtitle"
              text={"mo - tu - we - th - fr - sa - su"}
            />
          </View>
        </Card>
        <TextField
          leftIconName="note-text-outline"
          name="description"
          placeholder="John will starts next monday"
          multiline
          maxLength={500}
        />
      </ScrollView>
    </Screen>
  );
};
const sampleScheduleData = [
  {
    dayId: 1,
    dayName: "Sunday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: false,
  },
  {
    dayId: 2,
    dayName: "Monday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: true,
  },
  {
    dayId: 3,
    dayName: "Tuesday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: true,
  },
  {
    dayId: 4,
    dayName: "Wednesday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: true,
  },
  {
    dayId: 5,
    dayName: "Thursday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: true,
  },
  {
    dayId: 6,
    dayName: "Friday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: true,
  },
  {
    dayId: 7,
    dayName: "Saturday",
    startTime: 540,
    endTime: 1020,
    isDayActive: null,
    isDayActiveDefault: false,
  },
];
