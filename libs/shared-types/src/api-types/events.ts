import { DocType, SuccessResponseType } from ".";
import { EventType } from "..";

export type EventsSuccessResponseType = SuccessResponseType<EventsPayloadType>;

export type EventsPayloadType = DocType<EventType>[];

export type EventsSuccessFnType = (
  payload: EventsPayloadType,
  message: string
) => EventsSuccessResponseType;
