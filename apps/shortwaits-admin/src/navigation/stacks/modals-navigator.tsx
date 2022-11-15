import React from "react";
import { StyleSheet } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { Portal } from "@gorhom/portal";

import {
  SelectorScreenModal,
  ScheduleModal,
  ServicesModal,
} from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { useTheme } from "../../theme";
import { ModalStackParamList } from "../navigation-types";
import { FormModalScreen } from "../../screens/modals/forms";

const {
  SELECTOR_MODAL_SCREEN,
  SCHEDULE_MODAL_SCREEN,
  FORM_MODAL_SCREEN,
  SERVICE_MODAL_SCREEN,
} = MODAL_SCREENS;

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
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const modalScreensOptions: StackNavigationOptions = {
    // presentation: "modal",
    headerShown: true,
    gestureDirection: "vertical",
    // cardStyleInterpolator: forFade,
    //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
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
