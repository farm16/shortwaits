import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";

import {
  NAVIGATION_STACKS,
  UNAUTHORIZED_SCREENS,
  AUTHORIZED_SCREENS,
  AUTHORIZED_STACK_SCREENS,
  MODAL_SCREENS,
} from "./navigation-constants";
import { selectorConfigs } from "../screens/modals/selector/selector-config";
import {
  BusinessLabelType,
  CategoryDtoType,
  CreateEventDtoType,
  EventDtoType,
  ServiceDtoType,
  UpdateEventDtoType,
  CreateBusinessUserDtoType,
  CreateClientUserDtoType,
} from "@shortwaits/shared-lib";

export type FormData = {
  addEvent: CreateEventDtoType;
  addClient: CreateClientUserDtoType;
  addStaff: CreateBusinessUserDtoType;
  updateEvent: UpdateEventDtoType;
};
export type FormType = keyof FormData;
export type FormDataType = FormData[FormType];

export type SelectorModalData =
  | string
  | CategoryDtoType
  | ServiceDtoType
  | BusinessLabelType
  | { key: string; title: string; subTitle?: string };

export type SelectorModalModeType = keyof typeof selectorConfigs;

export type ScheduleModalModeType = "My-Business-Hours" | "User-Hours";

export type ModalStackParamList = {
  [MODAL_SCREENS.SELECTOR_MODAL_SCREEN]: {
    type: SelectorModalModeType;
    headerTitle?: string;
    multiple?: boolean;
    data?: SelectorModalData[];
    mode?: "update" | "create";
    searchable?: boolean;
    onSelect(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.SCHEDULE_MODAL_SCREEN]: {
    type: ScheduleModalModeType;
    mode?: "update" | "create";
  };
  [MODAL_SCREENS.SERVICE_MODAL_SCREEN]: {
    mode: "update" | "create";
    initialValues?: any;
  };
  // multiple forms in one modal ex. addClient, addEvent, addStaff, etc.
  [MODAL_SCREENS.FORM_MODAL_SCREEN]: {
    form: FormType;
    initialValues?: FormData[FormType];
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    closeOnSubmit?: boolean;
  };
};

export type AuthorizedTabsParamList = {
  [AUTHORIZED_SCREENS.ACTIVITY_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.EVENTS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.MY_BUSINESS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.SETTINGS_SCREEN]: undefined;
  [AUTHORIZED_SCREENS.CLIENTS_SCREEN]: undefined;
};

export type AuthorizedStackParamList = {
  [AUTHORIZED_STACK_SCREENS.EVENT_SCREEN]: {
    event: EventDtoType;
  };
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
  [NAVIGATION_STACKS.AUTHORIZED_TAB]: NavigatorScreenParams<AuthorizedTabsParamList>;
  [NAVIGATION_STACKS.AUTHORIZED_STACK]: NavigatorScreenParams<AuthorizedStackParamList>;
  [NAVIGATION_STACKS.MODALS]: NavigatorScreenParams<ModalStackParamList>;
};

type MODAL_SCREENS_KEYS = keyof typeof MODAL_SCREENS;
type MODAL_SCREENS_TYPES = (typeof MODAL_SCREENS)[MODAL_SCREENS_KEYS];

type UNAUTHORIZED_SCREENS_KEYS = keyof typeof UNAUTHORIZED_SCREENS;
type UNAUTHORIZED_SCREENS_TYPES = (typeof UNAUTHORIZED_SCREENS)[UNAUTHORIZED_SCREENS_KEYS] | MODAL_SCREENS_TYPES;

type AUTHORIZED_SCREENS_KEYS = keyof typeof AUTHORIZED_SCREENS;

type AUTHORIZED_SCREENS_TYPES = (typeof AUTHORIZED_SCREENS)[AUTHORIZED_SCREENS_KEYS] | MODAL_SCREENS_TYPES;

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
    StackNavigationProp<AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>
  >;
  route: RouteProp<AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList, T>;
}

export interface ModalsScreenProps<T extends keyof ModalStackParamList> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<
      UnauthorizedStackParamList & AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList,
      T
    >
  >;
  route: RouteProp<
    UnauthorizedStackParamList & AuthorizedTabsParamList & AuthorizedStackParamList & ModalStackParamList,
    T
  >;
}

export type STACKS_TYPES = (typeof NAVIGATION_STACKS)[keyof typeof NAVIGATION_STACKS];

export type ALL_SCREENS_TYPE = AUTHORIZED_SCREENS_TYPES | UNAUTHORIZED_SCREENS_TYPES;

export type ScreenProps = AuthorizedTabsParamList &
  AuthorizedStackParamList &
  ModalStackParamList &
  UnauthorizedStackParamList;
