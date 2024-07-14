import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentEventsState } from "../slices/events/event-slice";

export const useEvents = () => {
  const events = useSelector(selectCurrentEventsState);

  return useMemo(() => events, [events]);
};

export const useEvent = eventId => {
  const events = useSelector(selectCurrentEventsState);
  const event = events.find(event => event._id === eventId);

  return useMemo(() => event, [event]);
};
