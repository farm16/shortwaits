import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventScreenPropTypes, ScheduleModalScreenPropTypes, SelectorModalScreenPropTypes } from './navigation-screen-props';

// ==================== Authenticated screens ====================
export type AuthenticatedTabsParamList = {
  'home-screen': undefined;
  'explore-screen': undefined;
  'settings-screen': undefined;
};
export type AuthenticatedStackParamList = {
  'event-screen': EventScreenPropTypes;
  'plans-screen': undefined;
};
// ===============================================================

// ==================== Unauthenticated screens ====================
export type UnauthenticatedStackParamList = {
  'welcome-screen': undefined;
  'sign-in-screen': undefined;
  'sign-up-screen': undefined;
};
// ===============================================================

// ==================== Modal screens ====================
// available to both authenticated and unauthenticated stacks
export type ModalStackParamList = {
  'selector-modal-screen': SelectorModalScreenPropTypes;
  'schedule-modal-screen': ScheduleModalScreenPropTypes;
};
// ===============================================================

export type ModalScreens = keyof ModalStackParamList;
export type AuthenticatedTabsScreens = keyof AuthenticatedTabsParamList;
export type AuthenticatedStackScreens = keyof AuthenticatedStackParamList;
export type UnauthenticatedStackScreens = keyof UnauthenticatedStackParamList;

export type AuthenticatedParamsList = AuthenticatedTabsParamList & AuthenticatedStackParamList & ModalStackParamList;
export type UnauthenticatedParamsList = UnauthenticatedStackParamList & ModalStackParamList;

export type UnauthenticatedScreens = UnauthenticatedStackScreens | ModalScreens;
export type AuthenticatedScreens = AuthenticatedTabsScreens | AuthenticatedStackScreens | ModalScreens;

export type RootStackParamList = {
  'authenticated-stack': NavigatorScreenParams<AuthenticatedStackParamList>;
  'authenticated-tab': NavigatorScreenParams<AuthenticatedTabsParamList>;
  'unauthenticated-stack': NavigatorScreenParams<UnauthenticatedStackParamList>;
  'modals-stack': NavigatorScreenParams<ModalStackParamList>;
};

export interface UnauthenticatedScreenProps<T extends UnauthenticatedScreens> {
  navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<UnauthenticatedParamsList, T>>;
  route: RouteProp<UnauthenticatedParamsList, T>;
}

export interface AuthenticatedScreenProps<T extends AuthenticatedScreens> {
  navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<AuthenticatedParamsList, T>>;
  route: RouteProp<AuthenticatedParamsList, T>;
}

export interface ModalsScreenProps<T extends ModalScreens> {
  navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<UnauthenticatedStackParamList & AuthenticatedParamsList, T>>;
  route: RouteProp<UnauthenticatedStackParamList & AuthenticatedParamsList, T>;
}

export type Stacks = keyof RootStackParamList;
export type Screens = UnauthenticatedScreens | AuthenticatedScreens;
export type ScreensPropsTypes = AuthenticatedTabsParamList & AuthenticatedStackParamList & ModalStackParamList & UnauthenticatedStackParamList;
