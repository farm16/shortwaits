import { customAlphabet } from "nanoid";

export function generateShortId(size = 16) {
  const generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", size);
  const shortId = generateShortId();
  return shortId;
}
