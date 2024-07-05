import { AddLocalClientDtoType, AddressType } from "@shortwaits/shared-lib";
import { Platform } from "react-native";
import { Contact } from "react-native-contacts";

export function getUsersFromOsContacts(contacts: Contact[]) {
  return contacts.map(contact => getUserFromOsContact(contact as Contact));
}

function getUserFromOsContact(contact: Contact): AddLocalClientDtoType {
  const { givenName, familyName, middleName, displayName, phoneNumbers, emailAddresses, postalAddresses, imAddresses } = contact;
  const addresses = postalAddresses.map(postalAddress => {
    return {
      label: postalAddress.label ?? "home",
      address1: postalAddress.formattedAddress ?? "",
      address2: "",
      city: postalAddress.city ?? "",
      region: postalAddress.region ?? "",
      state: postalAddress.state ?? "",
      postCode: postalAddress.postCode ?? "",
      country: postalAddress.country ?? "",
    } as AddressType;
  });

  if (Platform.OS === "android") {
    const phoneNumber = phoneNumbers.length > 0 ? phoneNumbers[0].number : null;
    const email = emailAddresses.length > 0 ? emailAddresses[0].email : "";
    const username = displayName || phoneNumber || email || givenName || familyName;

    const accountImageUrl = "";
    return {
      givenName,
      familyName,
      middleName,
      displayName,
      phoneNumbers,
      imAddresses,
      email: email,
      username: username,
      alias: "displayName",
      accountImageUrl,
      clientType: "local",
      locale: null,
      socialAccounts: null,
      desiredCurrencies: null,
      addresses,
    };
  }
  const email = phoneNumbers.length > 0 ? phoneNumbers[0].number : "";

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
