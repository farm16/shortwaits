import { Document } from "mongoose";
import { ObjectId } from "..";

import { PaginatedModel } from "./helpers";

export type EventType = {
  name: string;
  keys: string[];
  description: string;
  staffIds: ObjectId[];
  clientIds: ObjectId[];
  features: string[];
  state: number;
  startTime: Date;
  endTime: Date;
  endTimeExpected: Date;
  priceExpected: number;
  priceFinal: number;
  canceled: boolean;
  cancellationsReason: string;
  deleted: boolean;
};

export type EventDocType = EventType & Document;

export type EventModelType = PaginatedModel<EventDocType>;
