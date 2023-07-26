import { ClientUserType } from "@shortwaits/shared-lib";
import { Contact } from "react-native-contacts";

export function getUsersFromOsContacts(contacts: Contact[]) {
  return contacts.map(contact => getUserFromOsContact(contact));
}

function getUserFromOsContact({
  givenName,
  familyName,
  middleName,
  displayName,
  phoneNumbers,
  postalAddresses,
  imAddresses,
}: Contact): Partial<ClientUserType> {
  const addresses = postalAddresses.map(postalAddress => {
    return {
      label: postalAddress.label,
      address1: postalAddress.formattedAddress,
      address2: null,
      city: postalAddress.city,
      region: postalAddress.region,
      state: postalAddress.state,
      postCode: Number(postalAddress.postCode),
      country: postalAddress.country,
    };
  });
  return {
    givenName,
    familyName,
    middleName,
    displayName,
    phoneNumbers,
    imAddresses,
    email: phoneNumbers[0].number,
    username: phoneNumbers[0].number,
    alias: "givenName",
    addresses,
  };
}
