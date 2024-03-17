/* eslint-disable @typescript-eslint/ban-types */
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NonIdealStateTypes } from "../components";
import { QrScannerOptions } from "../screens";
import { ThemeColorName } from "../theme";
import { AUTHORIZED_SCREENS, MODAL_SCREENS, NAVIGATION_STACKS, UNAUTHORIZED_SCREENS } from "./navigation-constants";

export type SelectorModalScreenParams<Type, Data> = {
  type: Type;
  headerTitle?: string;
  multiple?: boolean;
  data?: Data[];
  selectedData?: string[];
  onGoBack?(arg0: any): void;
  onSelect?(arg0: any): void;
  onSubmit?(arg0: any): void;
  searchable?: boolean;
  closeOnSelect?: boolean;
  disableSelect?: boolean;
  itemRightIconName?: string;
  itemRightIconColor?: ThemeColorName;
  minSelectedItems?: number;
  maxSelectedItems?: number;
  nonIdealStateType?: NonIdealStateTypes;
};

type SelectorModalScreenParamsType = "static";
type SelectorModalScreenParamsData = { key: string; title: string; subTitle?: string; itemData?: any };

export type ModalStackParamList = {
  [MODAL_SCREENS.QR_SCANNER_MODAL_SCREEN]: {
    onSubmit?(qrValue: string): void;
    onDismiss?(): void;
    title?: string;
    description?: string;
    options?: QrScannerOptions[];
  };
  [MODAL_SCREENS.SELECTOR_MODAL_SCREEN]: SelectorModalScreenParams<SelectorModalScreenParamsType, SelectorModalScreenParamsData>;
};

export type AuthorizedTabsParamList = {};

export type AuthorizedStackParamList = {};

export type UnauthorizedStackParamList = {};

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
