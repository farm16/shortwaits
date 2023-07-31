export const formatAddClientsValues = formValues => {
  const formattedValues = [];
  const values = {
    clientType: "local",
    businesses: [formValues.businessId],
    doe: formValues.doe,
    username: formValues.email,
    alias: "displayName",
    displayName: formValues.displayName,
    familyName: formValues.familyName,
    givenName: formValues.givenName,
    middleName: formValues.middleName,
    accountImageUrl: formValues.accountImageUrl,
    phoneNumbers: [
      {
        label: "",
        number: formValues.phoneNumber1,
      },
      {
        label: "",
        number: formValues.phoneNumber2,
      },
    ],
    imAddresses: [
      {
        username: "",
        service: "",
      },
    ],
    addresses: [
      {
        label: "address1",
        address1: formValues.address1,
        address2: formValues.address2,
        city: formValues.city,
        region: formValues.region,
        state: formValues.state,
        postCode: formValues.postCode,
        country: formValues.country,
      },
    ],
    socialAccounts: [
      {
        kind: "",
        uid: "",
        username: "",
        password: "",
      },
    ],
    email: formValues.email,
    desiredCurrencies: [formValues.desiredCurrencies],
    locale: {
      countryCode: "",
      isRTL: false,
      languageCode: "",
      languageTag: "",
    },
  };
  formattedValues.push(values);
  return formattedValues;
};
