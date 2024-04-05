import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventResponseType, ServiceResponseType, endpoints } from "@shortwaits/shared-lib";

type GetEventDetailsForClientRequest = {
  shortEventId: string;
};
export const getEventDetailsForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventResponseType, GetEventDetailsForClientRequest>({
    query: ({ shortEventId }) => endpoints.getEventDetailsForClient.getQueryConfig({ pathVars: [shortEventId] }),
  });

export const getEventsDetailsForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventResponseType, never>({
    query: () => endpoints.getEventsDetailsForClient.getQueryConfig(),
  });

type GetServiceByIdForClientRequest = {
  serviceId: string;
};
export const getServiceByIdForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ServiceResponseType, GetServiceByIdForClientRequest>({
    query: ({ serviceId }) => endpoints.getServiceByIdForClient.getQueryConfig({ pathVars: [serviceId] }),
  });

type GetServicesByBusinessIdsForClientRequest = {
  businessId: string;
};
export const getServicesByBusinessIdsForClient = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventResponseType, GetServicesByBusinessIdsForClientRequest>({
    query: ({ businessId }) => endpoints.getServicesByBusinessIdsForClient.getQueryConfig({ pathVars: [businessId] }),
  });
