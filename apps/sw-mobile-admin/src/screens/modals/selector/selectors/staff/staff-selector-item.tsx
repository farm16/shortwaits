import React from "react";
import { UserDtoType } from "@shortwaits/shared-lib";

import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function StaffSelectorItem(props: SelectorItemProps<UserDtoType>) {
  const { item } = props;

  return <ButtonCard title={item.familyName} subTitle={item.email} />;
}
