import React, { FC } from "react";

import { ModalsScreenProps, SelectorModalModeType } from "../../../navigation";
import { CategoriesSelector } from "./selectors/categories/categories-selector";
import { StaffSelector } from "./selectors/staff/staff-selector";
import { ServicesSelector } from "./selectors/services/services-selector";
import { StaticSelector } from "./selectors/static/static-selector";

const selectorsComponents: Record<
  SelectorModalModeType,
  FC<ModalsScreenProps<"selector-modal-screen">>
> = {
  staff: StaffSelector,
  categories: CategoriesSelector,
  services: ServicesSelector,
  static: StaticSelector,
};

export const SelectorScreenModal: FC<
  ModalsScreenProps<"selector-modal-screen">
> = props => {
  const type = props.route.params.type;
  const Selector = selectorsComponents[type];

  return <Selector {...props} />;
};
