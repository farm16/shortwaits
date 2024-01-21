import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NonIdealStateTypes } from "@shortwaits/shared-ui";
import {
  BusinessDtoType,
  BusinessLabelType,
  BusinessUserDtoType,
  BusinessWeekDaysType,
  CategoryDtoType,
  ClientUserDtoType,
  CreateBusinessUserDtoType,
  CreateClientUserDtoType,
  CreateEventDtoType,
  EventDtoType,
  ServiceDtoType,
  UpdateEventDtoType,
  UpdateLocalClientDtoType,
  WeekHoursType,
} from "@shortwaits/shared-utils";
import { selectorConfigs } from "../screens/modals/selector/selector-config";
import { ThemeColorName } from "../theme/Colors";
import { AUTHORIZED_SCREENS, AUTHORIZED_STACK_SCREENS, MODAL_SCREENS, NAVIGATION_STACKS, UNAUTHORIZED_SCREENS } from "./navigation-constants";

export type FormData = {
  addEvent: CreateEventDtoType;
  addClient: CreateClientUserDtoType;
  addStaff: CreateBusinessUserDtoType;
  addService: ServiceDtoType;
  updateService: ServiceDtoType;
  updateEvent: UpdateEventDtoType;
};

export type FormType = keyof FormData;
export type FormDataType = FormData[FormType];

export type SelectorModalData =
  | string
  | CategoryDtoType
  | ServiceDtoType
  | BusinessLabelType
  | EventDtoType
  | BusinessUserDtoType
  | ClientUserDtoType
  | { key: string; title: string; subTitle?: string; itemData?: any };

export type SelectorModalModeType = keyof typeof selectorConfigs;

export type ScheduleModalModeType = "My-Business-Hours" | "Business-User-Hours" | "Client-User-Hours";

export type ModalStackParamList = {
  [MODAL_SCREENS.SELECTOR_MODAL_SCREEN]: {
    type: SelectorModalModeType;
    headerTitle?: string;
    multiple?: boolean;
    data?: SelectorModalData[];
    selectedData?: string[];
    onGoBack?(arg0): void;
    onSelect?(arg0): void;
    onSubmit?(arg0): void;
    searchable?: boolean;
    closeOnSelect?: boolean;
    disableSelect?: boolean;
    itemRightIconName?: string;
    itemRightIconColor?: ThemeColorName;
    minSelectedItems?: number;
    maxSelectedItems?: number;
    nonIdealStateType?: NonIdealStateTypes;
  };
  [MODAL_SCREENS.SCHEDULE_MODAL_SCREEN]: {
    hours: WeekHoursType;
    headerTitle?: string;
    allowHours?: boolean;
    allowCloseAll?: boolean;
    days?: BusinessWeekDaysType[];
    disabledDays?: BusinessWeekDaysType[];
    onSubmit(hours: WeekHoursType): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.SERVICE_MODAL_SCREEN]: {
    service?: ServiceDtoType;
  };
  [MODAL_SCREENS.ADD_CLIENT_MODAL_SCREEN]: {
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.UPDATE_CLIENT_MODAL_SCREEN]: {
    initialValues: ClientUserDtoType;
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.ADD_LOCAL_CLIENT_MODAL_SCREEN]: {
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.UPDATE_LOCAL_CLIENT_MODAL_SCREEN]: {
    initialValues: UpdateLocalClientDtoType;
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.ADD_EVENT_MODAL_SCREEN]: {
    initialValues?: FormData[FormType];
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.UPDATE_EVENT_MODAL_SCREEN]: {
    initialValues: EventDtoType;
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onGoBack?(arg0): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.ADD_STAFF_MODAL_SCREEN]: {
    initialValues?: FormData[FormType];
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.ADD_SERVICE_MODAL_SCREEN]: {
    initialValues?: FormData[FormType];
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.UPDATE_SERVICE_MODAL_SCREEN]: {
    initialValues?: FormData[FormType];
    onSubmit?<T extends keyof FormData>(arg: FormData[T]): void;
    onDone?(): void;
    closeOnSubmit?: boolean;
  };
  [MODAL_SCREENS.WEBVIEW_MODAL_SCREEN]: {
    uri: string;
    header?: string;
    onLoad?(): void;
    onGoBack?(arg0): void;
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
    eventId: string;
  };
  [AUTHORIZED_STACK_SCREENS.PLANS_SCREEN]: {
    business?: BusinessDtoType;
  };
  [AUTHORIZED_STACK_SCREENS.BUSINESS_CLIENT_SCREEN]: {
    client: ClientUserDtoType;
  };
  [AUTHORIZED_STACK_SCREENS.BUSINESS_STAFF_SCREEN]: {
    staff: BusinessUserDtoType;
  };
  [AUTHORIZED_STACK_SCREENS.BUSINESS_PROFILE_SCREEN]: undefined;
  [AUTHORIZED_STACK_SCREENS.APP_INFO_SCREEN]: undefined;
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
