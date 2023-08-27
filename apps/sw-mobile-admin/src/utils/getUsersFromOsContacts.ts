import { CreateClientUserDtoType } from "@shortwaits/shared-lib";
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
}: Contact): CreateClientUserDtoType {
  const addresses = postalAddresses.map(postalAddress => {
    return {
      label: postalAddress.label,
      address1: postalAddress.formattedAddress,
      address2: null,
      city: postalAddress.city,
      region: postalAddress.region,
      state: postalAddress.state,
      postCode: postalAddress.postCode,
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
    accountImageUrl: null,
    clientType: "local",
    locale: null,
    socialAccounts: null,
    desiredCurrencies: null,
    addresses,
  };
}
