import { Document } from "mongoose";
import { DocType, ObjectId, ServicesType, UserPayloadType } from "..";

import { PaginatedModel } from "./helpers";

export type EventType = {
  name: string;
  description: string;
  service: DocType<ServicesType>;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  staff: UserPayloadType[];
  clients: UserPayloadType[];
  features: string[];
  status: {
    statusCode: number;
    statusName: "pending" | "success" | "failed";
  };
  durationInMin: number;
  startTime: Date;
  endTime: Date;
  endTimeExpected: Date;
  priceExpected: number;
  priceFinal: number;
  canceled: boolean;
  cancellationReason: string;
  isGroupEvent: boolean;
  repeat: boolean;
  payment: object;
  notes: string;
  labels: string[];
  deleted: boolean;
};

export type EventDocType = EventType & Document;

export type EventModelType = PaginatedModel<EventDocType>;
