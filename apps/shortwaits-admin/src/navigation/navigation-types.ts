import { StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";

import {
  NAVIGATION_STACKS,
  UNAUTHORIZED_SCREENS,
  AUTHORIZED_SCREENS,
  MODAL_SCREENS,
} from "./navigation-constants";
import { selectorConfigs } from "../screens/modals/selector/selector-config";

export type ScheduleModalType = "My-Business-Hours" | "User-Hours";
export type SelectorModalType = keyof typeof selectorConfigs;
// | "My-Business-Currency"
export type serviceModalType = "My-Business-Services";

export type ScheduleMode = "";
export type ServicesMode = "";

export type ModalStackParamList = {
  [MODAL_SCREENS.SELECTOR_MODAL_SCREEN]: {
    type: SelectorModalType;
  };
  [MODAL_SCREENS.SCHEDULE_MODAL_SCREEN]: {
    type: ScheduleModalType;
  };
  [MODAL_SCREENS.SERVICE_MODAL_SCREEN]: {
    type: serviceModalType;
  };
};

export type AuthorizedStackParamList = {
  [AUTHORIZED_SCREENS.ACTIVITY_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.EVENTS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.MY_BUSINESS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.SETTINGS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.CLIENTS_SCREEN]: undefined;
};

export type UnauthorizedStackParamList = {
  [UNAUTHORIZED_SCREENS.WELCOME_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.ONBOARDING_1_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.ONBOARDING_2_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_IN_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_IN_WITH_EMAIL_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_UP_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_UP_WITH_EMAIL_SCREEN]: undefined;
};

export type RootStackParamList = {
  [NAVIGATION_STACKS.UNAUTHORIZED]: NavigatorScreenParams<UnauthorizedStackParamList>;
  [NAVIGATION_STACKS.AUTHORIZED]: NavigatorScreenParams<AuthorizedStackParamList>;
  [NAVIGATION_STACKS.MODALS]: NavigatorScreenParams<ModalStackParamList>;
};

/**
 * @ModalsScreenProps
 */
export interface ModalsScreenProps<T extends keyof ModalStackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<ModalStackParamList, T>
  >;
  route: RouteProp<ModalStackParamList, T>;
}

type UNAUTHORIZED_SCREENS_KEYS = keyof typeof UNAUTHORIZED_SCREENS;
type UNAUTHORIZED_SCREENS_TYPES =
  typeof UNAUTHORIZED_SCREENS[UNAUTHORIZED_SCREENS_KEYS];

type AUTHORIZED_SCREENS_KEYS = keyof typeof AUTHORIZED_SCREENS;
type AUTHORIZED_SCREENS_TYPES =
  typeof AUTHORIZED_SCREENS[AUTHORIZED_SCREENS_KEYS];
/**
 * @UnauthorizedScreenProps
 * this combines UnauthorizedStackParamList & ModalStackParamList
 *
 */
export interface UnauthorizedScreenProps<T extends UNAUTHORIZED_SCREENS_TYPES> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<UnauthorizedStackParamList & ModalStackParamList, T>
  >;
  route: RouteProp<UnauthorizedStackParamList & ModalStackParamList, T>;
}

export interface AuthorizedScreenProps<T extends AUTHORIZED_SCREENS_TYPES> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<AuthorizedStackParamList & ModalStackParamList, T>
  >;
  route: RouteProp<AuthorizedStackParamList & ModalStackParamList, T>;
}
