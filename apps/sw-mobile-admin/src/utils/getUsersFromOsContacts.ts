import { CreateClientUserDtoType } from "@shortwaits/shared-lib";
import { Platform } from "react-native";
import { Contact } from "react-native-contacts";

export function getUsersFromOsContacts(contacts: Contact[]) {
  return contacts.map(contact => getUserFromOsContact(contact as Contact));
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
  if (Platform.OS === "android") {
    const email = phoneNumbers.length > 0 ? phoneNumbers[0].number : null;
    const accountImageUrl = "";
    return {
      givenName,
      familyName,
      middleName,
      displayName,
      phoneNumbers,
      imAddresses,
      email: email,
      username: email,
      alias: "givenName",
      accountImageUrl,
      clientType: "local",
      locale: null,
      socialAccounts: null,
      desiredCurrencies: null,
      addresses,
    };
  }
  const email = phoneNumbers.length > 0 ? phoneNumbers[0].number : null;

  return {
    givenName,
    familyName,
    middleName,
    displayName,
    phoneNumbers,
    imAddresses,
    email: email,
    username: email,
    alias: "givenName",
    accountImageUrl: null,
    clientType: "local",
    locale: null,
    socialAccounts: null,
    desiredCurrencies: null,
    addresses,
  };
}
