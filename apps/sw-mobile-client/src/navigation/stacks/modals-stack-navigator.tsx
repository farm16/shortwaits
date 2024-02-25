import { createStackNavigator } from "@react-navigation/stack";
import { QrScannerModal, MODAL_SCREENS as SHARED_MODAL_SCREENS, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { SelectorScreenModal } from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { ModalStackParamList } from "../navigation-types";

const Stack = createStackNavigator<ModalStackParamList>();
const { QR_SCANNER_MODAL_SCREEN } = SHARED_MODAL_SCREENS;
const { SELECTOR_MODAL_SCREEN } = MODAL_SCREENS;
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

      {/* <Stack.Screen name={'schedule-modal-screen'} component={ScheduleModal} /> 
      <Stack.Screen name={modalStack['service-modal-screen']} component={ServicesModal} />
      <Stack.Screen name={modalStack['add-client-modal-screen']} component={AddClientModal} />
      <Stack.Screen name={modalStack['add-event-modal-screen']} component={AddEventModal} />
      <Stack.Screen name={modalStack['add-staff-modal-screen']} component={AddStaffModal} />
      <Stack.Screen name={modalStack['add-service-modal-screen']} component={AddServicesModal} />
      <Stack.Screen name={modalStack['update-service-modal-screen']} component={UpdateServicesModal} />
      <Stack.Screen name={modalStack['update-event-modal-screen']} component={UpdateEventModal} /> */}
    </Stack.Navigator>
  );
};
