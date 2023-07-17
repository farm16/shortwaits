import { Types } from "mongoose";

export function convertArrayToObjectId(ids: string[]): Types.ObjectId[] {
  return ids.map(id => new Types.ObjectId(id));
}
