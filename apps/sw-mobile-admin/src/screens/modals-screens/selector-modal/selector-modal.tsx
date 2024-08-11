import React, { FC } from "react";
import { ModalsScreenProps, SelectorModalModeType } from "../../../navigation";
import { CategoriesSelector } from "./selectors/categories/categories-selector";
import { EventsSelector } from "./selectors/events/events-selector";
import { EventLabelsSelector } from "./selectors/labels/event-labels-selector";
import { ServicesSelector } from "./selectors/services/services-selector";
import { StaffSelector } from "./selectors/staff/staff-selector";
import { StaticSelector } from "./selectors/static/static-selector";

const selectorScreenModalModes: Record<SelectorModalModeType, FC<ModalsScreenProps<"selector-modal-screen">>> = {
  staff: StaffSelector,
  categories: CategoriesSelector,
  services: ServicesSelector,
  static: StaticSelector,
  events: EventsSelector,
  eventLabels: EventLabelsSelector,
};

export const SelectorScreenModal: FC<ModalsScreenProps<"selector-modal-screen">> = props => {
  const mode = props.route.params.mode;
  const Selector = selectorScreenModalModes[mode];

  return <Selector {...props} />;
};
