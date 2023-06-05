import {
  EventsEndpointsMethods,
  EventsEndpointsPaths,
} from "@shortwaits/shared-types";

const EVENTS_BASE_PATH = "/events";

type EventEndpoints = {
  [x: string]: {
    getPath: (id?: string) => EventsEndpointsPaths;
    METHOD: EventsEndpointsMethods;
  };
};

export const EVENTS: EventEndpoints = {
  getEvent: {
    getPath: (_id: string) => `${EVENTS_BASE_PATH}/${_id}`,
    METHOD: "GET",
  },
  getUserEvents: {
    getPath: (userId: string) => `${EVENTS_BASE_PATH}/user/${userId}`,
    METHOD: "GET",
  },
  getBusinessEvents: {
    getPath: (businessId: string) =>
      `${EVENTS_BASE_PATH}/business/${businessId}`,
    METHOD: "GET",
  },
  updateEvent: {
    getPath: () => `${EVENTS_BASE_PATH}`,
    METHOD: "POST",
  },
  createEvent: {
    getPath: () => `${EVENTS_BASE_PATH}`,
    METHOD: "PUT",
  },
};
