import mongoose, {
  Document as MongooseDocument,
  Schema,
  Types,
} from "mongoose";
import { ObjectId as MongoObjectId } from "mongodb";

export type Document = MongooseDocument;
export type ObjectId = Schema.Types.ObjectId | Types.ObjectId | MongoObjectId;
