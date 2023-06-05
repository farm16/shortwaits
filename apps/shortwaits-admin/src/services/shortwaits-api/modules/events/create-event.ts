import { shortwaitsApiEndpoints } from "../../../../configs";
import { EventDocType, ObjectId } from "@shortwaits/shared-types";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const { postEvent } = shortwaitsApiEndpoints.EVENTS;

type ResponseType = {
  events: EventDocType;
  event: ObjectId;
  business: ObjectId;
};
type RequestType<
  BodyType = Record<string, string>,
  ParamsType = Record<string, unknown>
> = {
  params: {
    id: string;
  } & ParamsType;
  body?: BodyType;
};

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResponseType, RequestType>({
    query: payload => ({
      url: postEvent.getPath(payload.params.id),
      method: postEvent.METHOD,
      body: payload,
    }),
  });
