import React, { FC } from "react";

import { ModalsScreenProps, SelectorModalModeType } from "../../../navigation";
import { Screen } from "../../../components";
import { CategoriesSelector } from "./selectors/categories/categories-selector";
import { StaffSelector } from "./selectors/staff/staff-selector";
import { ServicesSelector } from "./selectors/services/services-selector";
import { StaticSelector } from "./selectors/static/static-selector";
import { LabelsSelector } from "./selectors/labels/labels-selector";
import { EventLabelsSelector } from "./selectors/labels/event-labels-selector";

const selectorsComponents: Record<SelectorModalModeType, FC<ModalsScreenProps<"selector-modal-screen">>> = {
  staff: StaffSelector,
  clients: StaffSelector,
  categories: CategoriesSelector,
  services: ServicesSelector,
  static: StaticSelector,
  labels: LabelsSelector,
  eventLabels: EventLabelsSelector,
};

export const SelectorScreenModal: FC<ModalsScreenProps<"selector-modal-screen">> = props => {
  const type = props.route.params.type;
  const Selector = selectorsComponents[type];

  return (
    <Screen preset="fixed" unsafe withHorizontalPadding>
      <Selector {...props} />
    </Screen>
  );
};
