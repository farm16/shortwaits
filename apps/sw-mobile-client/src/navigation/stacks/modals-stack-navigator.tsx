import { createStackNavigator } from "@react-navigation/stack";
import { QrScannerModal, MODAL_SCREENS as SHARED_MODAL_SCREENS, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { SelectorScreenModal, UpdateEventModal } from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { ModalStackParamList } from "../navigation-types";

const Stack = createStackNavigator<ModalStackParamList>();
const { QR_SCANNER_MODAL_SCREEN } = SHARED_MODAL_SCREENS;
const { SELECTOR_MODAL_SCREEN, UPDATE_USER_PROFILE_MODAL_SCREEN } = MODAL_SCREENS;
export const ModalsNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name={SELECTOR_MODAL_SCREEN} component={SelectorScreenModal} />
      <Stack.Screen name={QR_SCANNER_MODAL_SCREEN} component={QrScannerModal} />
      <Stack.Screen name={UPDATE_USER_PROFILE_MODAL_SCREEN} component={UpdateEventModal} />
    </Stack.Navigator>
  );
};
