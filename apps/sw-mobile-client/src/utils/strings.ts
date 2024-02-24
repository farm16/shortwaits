export const getCapitalizedString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const phoneValidation = (phone: string) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return phoneRegExp.test(phone);
};
