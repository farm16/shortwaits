import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SelectorScreenModal,
  ScheduleModal,
  ServicesModal,
} from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { ModalStackParamList } from "../navigation-types";
import { FormModalScreen } from "../../screens/modals/forms";
import { useTheme } from "../../theme";
import { Platform } from "react-native";

const {
  SELECTOR_MODAL_SCREEN,
  SCHEDULE_MODAL_SCREEN,
  FORM_MODAL_SCREEN,
  SERVICE_MODAL_SCREEN,
} = MODAL_SCREENS;

const Stack = createStackNavigator<ModalStackParamList>();

export const ModalsNavigator = (): React.ReactElement => {
  const { Colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.backgroundOverlay,
        },
      }}
    >
      <Stack.Screen
        name={SELECTOR_MODAL_SCREEN}
        component={SelectorScreenModal}
      />
      <Stack.Screen name={SCHEDULE_MODAL_SCREEN} component={ScheduleModal} />
      <Stack.Screen name={SERVICE_MODAL_SCREEN} component={ServicesModal} />
      <Stack.Screen name={FORM_MODAL_SCREEN} component={FormModalScreen} />
    </Stack.Navigator>
  );
};
