import {
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
  WeekHoursType,
} from "@shortwaits/shared-lib";
import { NonIdealStateTypes, ThemeColorName } from "@shortwaits/shared-ui";

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

export type EventScreenPropTypes = {
  eventId: string;
};

export type SelectorTypes = "staff" | "categories" | "services" | "labels" | "static" | "clients" | "eventLabels";

export type SelectorModalData =
  | string
  | CategoryDtoType
  | ServiceDtoType
  | BusinessLabelType
  | EventDtoType
  | BusinessUserDtoType
  | ClientUserDtoType
  | { key: string; title: string; subTitle?: string; itemData?: any };

export type SelectorModalScreenPropTypes = {
  type: SelectorTypes;
  headerTitle?: string;
  multiple?: boolean;
  data?: SelectorModalData[];
  selectedData?: string[];
  onGoBack?(data: any): void;
  onSelect?(data: any): void;
  searchable?: boolean;
  closeOnSelect?: boolean;
  disableSelect?: boolean;
  itemRightIconName?: string;
  itemRightIconColor?: ThemeColorName;
  minSelectedItems?: number;
  maxSelectedItems?: number;
  nonIdealStateType?: NonIdealStateTypes;
};

export type ScheduleModalScreenPropTypes = {
  hours: WeekHoursType;
  headerTitle?: string;
  allowHours?: boolean;
  allowCloseAll?: boolean;
  days?: BusinessWeekDaysType[];
  disabledDays?: BusinessWeekDaysType[];
  onSubmit(hours: WeekHoursType): void;
  closeOnSubmit?: boolean;
};
