import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AddClientModal,
  AddEventModal,
  AddLocalClientModal,
  AddServicesModal,
  AddStaffModal,
  ScheduleModal,
  SelectorScreenModal,
  ServicesModal,
  UpdateEventModal,
  UpdateLocalClientModal,
  UpdateServicesModal,
} from "../../screens";
import { MODAL_SCREENS } from "../navigation-constants";
import { ModalStackParamList } from "../navigation-types";

const {
  SELECTOR_MODAL_SCREEN,
  SCHEDULE_MODAL_SCREEN,
  SERVICE_MODAL_SCREEN,
  ADD_CLIENT_MODAL_SCREEN,
  ADD_EVENT_MODAL_SCREEN,
  ADD_STAFF_MODAL_SCREEN,
  ADD_SERVICE_MODAL_SCREEN,
  UPDATE_SERVICE_MODAL_SCREEN,
  UPDATE_EVENT_MODAL_SCREEN,
  UPDATE_LOCAL_CLIENT_MODAL_SCREEN,
  ADD_LOCAL_CLIENT_MODAL_SCREEN,
} = MODAL_SCREENS;

const Stack = createStackNavigator<ModalStackParamList>();

export const ModalsNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SELECTOR_MODAL_SCREEN} component={SelectorScreenModal} />
      <Stack.Screen name={SCHEDULE_MODAL_SCREEN} component={ScheduleModal} />
      <Stack.Screen name={SERVICE_MODAL_SCREEN} component={ServicesModal} />
      <Stack.Screen name={ADD_EVENT_MODAL_SCREEN} component={AddEventModal} />
      <Stack.Screen name={ADD_STAFF_MODAL_SCREEN} component={AddStaffModal} />
      <Stack.Screen name={ADD_SERVICE_MODAL_SCREEN} component={AddServicesModal} />
      <Stack.Screen name={UPDATE_SERVICE_MODAL_SCREEN} component={UpdateServicesModal} />
      <Stack.Screen name={UPDATE_EVENT_MODAL_SCREEN} component={UpdateEventModal} />
      <Stack.Screen name={ADD_LOCAL_CLIENT_MODAL_SCREEN} component={AddLocalClientModal} />
      <Stack.Screen name={UPDATE_LOCAL_CLIENT_MODAL_SCREEN} component={UpdateLocalClientModal} />
      <Stack.Screen name={ADD_CLIENT_MODAL_SCREEN} component={AddClientModal} />
    </Stack.Navigator>
  );
};
