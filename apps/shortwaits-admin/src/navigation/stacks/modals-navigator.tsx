import React from "react";
import { StyleSheet } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import {
  SelectorScreenModal,
  ScheduleModal,
  ServicesModal,
} from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { useTheme } from "../../theme";
import { ModalStackParamList } from "../navigation-types";

const { SELECTOR_MODAL_SCREEN, SCHEDULE_MODAL_SCREEN, SERVICE_MODAL_SCREEN } =
  MODAL_SCREENS;

const Stack = createStackNavigator<ModalStackParamList>();

export const ModalsNavigator = (): React.ReactElement => {
  const {
    Colors,
    Common: { textPresets },
  } = useTheme();

  const headerStyles = StyleSheet.create({
    withBorder: {
      backgroundColor: Colors.background,
    },
    withOutBorder: {
      backgroundColor: Colors.background,
      shadowColor: Colors.transparent,
      borderBottomWidth: 0,
      elevation: 0, // for Android
      shadowOffset: {
        width: 0,
        height: 0, // for iOS
      },
    },
  });
  const modalScreensOptions: StackNavigationOptions = {
    presentation: "modal",
    headerShown: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyle: headerStyles.withOutBorder,
    headerTitleAlign: "center",
    headerTitleStyle: {
      ...textPresets.headerTitle,
      color: Colors.text,
      position: "absolute",
      alignSelf: "center",
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={modalScreensOptions}>
        <Stack.Screen
          name={SELECTOR_MODAL_SCREEN}
          component={SelectorScreenModal}
        />
        <Stack.Screen name={SCHEDULE_MODAL_SCREEN} component={ScheduleModal} />
        <Stack.Screen name={SERVICE_MODAL_SCREEN} component={ServicesModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
