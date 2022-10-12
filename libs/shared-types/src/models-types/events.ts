import { Document, Types } from "mongoose";
import { ObjectId } from "../common";
import { PaginatedModel } from "./helpers";

export type EventType = {
  leadClientName: string;
  name: string;
  description: string;
  eventImage: string;
  businessId: ObjectId;
  service: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  staff: ObjectId[];
  clients: ObjectId[];
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
