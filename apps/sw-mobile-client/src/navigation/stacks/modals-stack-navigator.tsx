import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { EventTicketModal, QrScannerModal, SelectorScreenModal, UpdateClientModal } from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { ModalStackParamList } from "../navigation-types";

const Stack = createStackNavigator<ModalStackParamList>();
const { SELECTOR_MODAL_SCREEN, QR_SCANNER_MODAL_SCREEN, UPDATE_CLIENT_MODAL_SCREEN, EVENT_TICKET_MODAL_SCREEN } = MODAL_SCREENS;

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
      <Stack.Screen name={UPDATE_CLIENT_MODAL_SCREEN} component={UpdateClientModal} />
      <Stack.Screen name={EVENT_TICKET_MODAL_SCREEN} component={EventTicketModal} />
    </Stack.Navigator>
  );
};
