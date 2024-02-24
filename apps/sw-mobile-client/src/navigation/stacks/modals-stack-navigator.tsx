import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { SelectorScreenModal } from "../../screens";
import { ModalStackParamList } from "../navigation-types";

const Stack = createStackNavigator<ModalStackParamList>();

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
      <Stack.Screen name={"selector-modal-screen"} component={SelectorScreenModal} />
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
