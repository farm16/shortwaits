import { ObjectId } from "@shortwaits/shared-lib";
import { customAlphabet } from "nanoid";

export function generateUniqueId(idLength = 16) {
  const generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", idLength);
  const shortId = generateShortId();
  return shortId;
}

export function getUniqueIdArray(array: ObjectId[]) {
  return [...new Set(array)];
}
