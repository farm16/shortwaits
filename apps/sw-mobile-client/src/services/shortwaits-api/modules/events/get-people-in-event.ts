import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { PeopleInEventResponseType, endpoints } from "@shortwaits/shared-lib";

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<PeopleInEventResponseType, string>({
    query: eventId =>
      endpoints.getPeopleInEvent.getConfig([], {
        eventId,
      }).url,
  });
