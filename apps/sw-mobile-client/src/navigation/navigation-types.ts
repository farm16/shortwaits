import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { EventDtoType, UpdateClientDtoType } from "@shortwaits/shared-lib";
import { SelectorModalScreenParams, ModalStackParamList as SharedModalStackParamList } from "@shortwaits/shared-ui";
import { AUTHORIZED_SCREENS, AUTHORIZED_STACK_SCREENS, AUTHORIZED_TAB_SCREENS, MODAL_SCREENS, NAVIGATION_STACKS, UNAUTHORIZED_SCREENS } from "./navigation-constants";

type SelectorModalScreenParamsType = "static";
type SelectorModalData = { key: string; title: string; subTitle?: string; itemData?: any };

export type ModalStackParamList = {
  [MODAL_SCREENS.SELECTOR_MODAL_SCREEN]: SelectorModalScreenParams<SelectorModalScreenParamsType, SelectorModalData>;
  [MODAL_SCREENS.SCHEDULE_MODAL_SCREEN]: undefined;
  [MODAL_SCREENS.UPDATE_CLIENT_MODAL_SCREEN]: {
    onSubmit(): void;
    onDone(): void;
    closeOnSubmit(): void;
    initialValues: UpdateClientDtoType;
  };
  [MODAL_SCREENS.QR_SCANNER_MODAL_SCREEN]: SharedModalStackParamList["qr-scanner-modal-screen"];
  [MODAL_SCREENS.EVENT_TICKET_MODAL_SCREEN]: {
    event: EventDtoType;
  };
};

export type AuthorizedTabsParamList = {
  [AUTHORIZED_TAB_SCREENS.HOME_SCREEN]: undefined;
  [AUTHORIZED_TAB_SCREENS.HISTORY_SCREEN]: undefined;
  [AUTHORIZED_TAB_SCREENS.FAVORITES_SCREEN]: undefined;
  [AUTHORIZED_TAB_SCREENS.SETTINGS_SCREEN]: undefined;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type AuthorizedStackParamList = {
  [AUTHORIZED_STACK_SCREENS.USER_PROFILE_SCREEN]: undefined;
  [AUTHORIZED_STACK_SCREENS.EVENT_DETAILS_SCREEN]: undefined;
  [AUTHORIZED_STACK_SCREENS.BUSINESS_DETAILS_SCREEN]: undefined;
};

export type UnauthorizedStackParamList = {
  [UNAUTHORIZED_SCREENS.WELCOME_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_IN_SCREEN]: undefined;
  [UNAUTHORIZED_SCREENS.SIGN_UP_SCREEN]: undefined;
};

export type RootStackParamList = {
  [NAVIGATION_STACKS.UNAUTHORIZED]: NavigatorScreenParams<UnauthorizedStackParamList>;
  [NAVIGATION_STACKS.AUTHORIZED_TAB]: NavigatorScreenParams<AuthorizedTabsParamList>;
  [NAVIGATION_STACKS.AUTHORIZED_STACK]: NavigatorScreenParams<AuthorizedStackParamList>;
  [NAVIGATION_STACKS.MODALS]: NavigatorScreenParams<ModalStackParamList>;
};

export type MODAL_SCREENS_KEYS = keyof typeof MODAL_SCREENS;
export type MODAL_SCREENS_TYPES = (typeof MODAL_SCREENS)[MODAL_SCREENS_KEYS];

export type UNAUTHORIZED_SCREENS_KEYS = keyof typeof UNAUTHORIZED_SCREENS;
export type UNAUTHORIZED_SCREENS_TYPES = (typeof UNAUTHORIZED_SCREENS)[UNAUTHORIZED_SCREENS_KEYS] | MODAL_SCREENS_TYPES;

export type AUTHORIZED_SCREENS_KEYS = keyof typeof AUTHORIZED_SCREENS;
export type AUTHORIZED_SCREENS_TYPES = (typeof AUTHORIZED_SCREENS)[AUTHORIZED_SCREENS_KEYS] | MODAL_SCREENS_TYPES;

/**
 * @UnauthorizedScreenProps
 * this combines UnauthorizedStackParamList & ModalStackParamList
 *
 */
export interface UnauthorizedScreenProps<T extends UNAUTHORIZED_SCREENS_TYPES> {
  navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<UnauthorizedStackParamList & ModalStackParamList, T>>;
  route: RouteProp<UnauthorizedStackParamList & ModalStackParamList, T>;
}

export interface AuthorizedScreenProps<T extends AUTHORIZED_SCREENS_TYPES> {
  navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>>;
  route: RouteProp<AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>;
}

export interface ModalsScreenProps<T extends keyof ModalStackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<UnauthorizedStackParamList & AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>
  >;
  route: RouteProp<UnauthorizedStackParamList & AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>;
}

export type STACKS_TYPES = (typeof NAVIGATION_STACKS)[keyof typeof NAVIGATION_STACKS];

export type ALL_SCREENS_TYPE = AUTHORIZED_SCREENS_TYPES | UNAUTHORIZED_SCREENS_TYPES;

export type ScreenProps = AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList & UnauthorizedStackParamList;
