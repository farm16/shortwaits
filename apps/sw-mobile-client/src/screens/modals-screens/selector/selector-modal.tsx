import { Screen, Space } from "@shortwaits/shared-ui";
import React, { FC } from "react";
import { ModalsScreenProps } from "../../../navigation";
import { CategoriesSelector } from "./selectors/categories/categories-selector";
import { ClientsSelector } from "./selectors/clients/clients-selector";
import { EventLabelsSelector } from "./selectors/labels/event-labels-selector";
import { LabelsSelector } from "./selectors/labels/labels-selector";
import { ServicesSelector } from "./selectors/services/services-selector";
// import { StaffSelector } from "./selectors/staff/staff-selector";
import { StaticSelector } from "./selectors/static/static-selector";

const selectorsComponents: Record<string, FC<ModalsScreenProps<"selector-modal-screen">>> = {
  // staff: StaffSelector,
  clients: ClientsSelector,
  categories: CategoriesSelector,
  services: ServicesSelector,
  static: StaticSelector,
  labels: LabelsSelector,
  eventLabels: EventLabelsSelector,
};
export function SelectorScreenModal(props: ModalsScreenProps<"selector-modal-screen">) {
  const mode = props.route.params.mode;
  const Selector = selectorsComponents[mode];

  return (
    <Screen preset="fixed" unsafe withHorizontalPadding>
      <Space />
      <Selector {...props} />
    </Screen>
  );
}
