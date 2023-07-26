import { Types } from "mongoose";

export function convertArrayToObjectId(ids: string[]): Types.ObjectId[] {
  return ids.map(id => new Types.ObjectId(id));
}

export function convertDomainToLowercase(email: string) {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);
    const lowercaseDomain = domainPart.toLowerCase();
    return `${localPart}@${lowercaseDomain}`;
  }
  return email;
}
