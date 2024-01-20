import { ObjectId as MongoObjectId } from "mongodb";
import { Document as MongooseDocument, Schema, Types } from "mongoose";
import { CommonResponseType } from "../api-types";

export type Document = MongooseDocument;
export type ObjectId = Schema.Types.ObjectId | Types.ObjectId | MongoObjectId;

export type ConvertToDtoType<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? U extends ObjectId
      ? string[] // Convert array of ObjectId to array of strings
      : U[] // Keep array elements unchanged if not ObjectId
    : T[K] extends ObjectId
    ? string // Convert ObjectId to string
    : T[K] extends Date
    ? string // Convert Date to string
    : T[K] extends Record<string, any>
    ? ConvertToDtoType<T[K]> // Handle nested objects
    : T[K]; // Keep other property types unchanged
};

export type MethodType<T, Q = undefined, B = undefined> = {
  query: Q;
  body: B;
  response: CommonResponseType<T>;
};

export type WithDbProps<T> = T & {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
