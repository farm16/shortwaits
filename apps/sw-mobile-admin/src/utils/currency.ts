import {
  BusinessAvailableCurrenciesType,
  CurrencyType,
} from "@shortwaits/shared-types";

/**
 * @todo this might need translation
 */
const currencies = {
  USD: "Dollar (USD)",
  PEN: "Sol (PEN)",
};
export const getPrettyStringFromCurrencyType = (currency: CurrencyType) => {
  if (!currency) return "select a currency";
  if (currencies[currency.code]) {
    return currencies[currency.code];
  } else {
    return currencies.USD;
  }
};

const symbols = {
  USD: "$",
  PEN: "S/.",
};
export const getCurrencySymbolFromCurrencyType = (
  currency: BusinessAvailableCurrenciesType
) => {
  if (!currency) return "";
  if (symbols[currency]) {
    return symbols[currency];
  } else {
    return symbols.USD;
  }
};

export const getPrettyStringFromPrice = (
  currency: BusinessAvailableCurrenciesType,
  price: number
) => {
  const localesWithOptions = {
    USD: {
      locales: "en-US",
      options: { style: "currency", currency: "USD" },
    },
  };
  const dollars = price / 100;
  dollars.toString(10);
  const priceString = dollars.toLocaleString(
    localesWithOptions[currency].locales,
    localesWithOptions[currency].options
  );
  return priceString;
};