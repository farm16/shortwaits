import { EventDtoType } from "@shortwaits/shared-lib";
import React from "react";
import { AgendaItem } from "../../../../../components";

type EventsSelectorItemProps = {
  item: EventDtoType;
};
export function EventsSelectorItem(props: EventsSelectorItemProps) {
  const { item } = props;

  return <AgendaItem item={item} triggerTick={false} />;
}
