import { Document, Types } from "mongoose";
import { PaginatedModel } from "./helpers";

export type EventType = {
  name: string;
  description: string;
  eventImage: string;
  businessId: Types.ObjectId;
  service: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  staff: Types.ObjectId[];
  clients: Types.ObjectId[];
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
