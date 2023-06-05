import { Document as MongooseDocument, Schema, Types } from "mongoose";
import { ObjectId as MongoObjectId } from "mongodb";
import { CommonResponseType } from "../api-types";

export type Document = MongooseDocument;
export type ObjectId = Schema.Types.ObjectId | Types.ObjectId | MongoObjectId;

export type ConvertIdsToStrings<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? U extends ObjectId
      ? string[]
      : U[]
    : T[K] extends ObjectId
    ? string
    : T[K];
};

export type MethodType<T, Q = undefined, B = undefined> = {
  query: Q;
  body: B;
  response: CommonResponseType<T>;
};
