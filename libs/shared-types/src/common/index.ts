import { ObjectId as MongoObjectId } from "mongodb";
import { Document as MongooseDocument, Types } from "mongoose";
export type Document = MongooseDocument;
export type ObjectId = Types.ObjectId | MongoObjectId;
