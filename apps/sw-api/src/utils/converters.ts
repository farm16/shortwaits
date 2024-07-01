import { Types } from "mongoose";

export function convertArrayToObjectId(ids: string[]): Types.ObjectId[] {
  return ids.map(id => new Types.ObjectId(id));
}

export function convertStringToObjectId(id: string): any {
  return new Types.ObjectId(id);
}

export function validateId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export function convertToLowercase(text: string) {
  return text.toLowerCase();
}
