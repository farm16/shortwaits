import {
  EventsEndpointsMethods,
  EventsEndpointsPaths,
} from "@shortwaits/shared-types";

const EVENTS_BASE_PATH = "/events";

type EventProps = {
  getPath: (id?: string) => EventsEndpointsPaths;
  METHOD: EventsEndpointsMethods;
};

export const EVENTS = {
  getEvent: {
    getPath: (_id: string) => `${EVENTS_BASE_PATH}/${_id}`,
    METHOD: "GET",
  } as EventProps,
  getUserEvents: {
    getPath: (userId: string) => `${EVENTS_BASE_PATH}/user/${userId}`,
    METHOD: "GET",
  } as EventProps,
  getEventsByBusiness: {
    getPath: (businessId: string) =>
      `${EVENTS_BASE_PATH}/business/${businessId}`,
    METHOD: "GET",
  } as EventProps,
  updateEvent: {
    getPath: () => `${EVENTS_BASE_PATH}`,
    METHOD: "PUT",
  } as EventProps,
  createEvent: {
    getPath: () => `${EVENTS_BASE_PATH}`,
    METHOD: "POST",
  } as EventProps,
};
