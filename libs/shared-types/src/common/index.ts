import { ObjectId as MongoObjectId } from "mongodb";
import mongoose, { Document as MongooseDocument } from "mongoose";
export type Document = MongooseDocument;
export type ObjectId = mongoose.Types.ObjectId | MongoObjectId;
