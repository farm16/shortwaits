import {
  CreateBusinessUserDtoType,
  CreateBusinessUsersDtoType,
  CreateClientUserDtoType,
  CreateClientUsersDtoType,
  generateAvatarUrl,
} from "@shortwaits/shared-lib";

export const generateBusinessUser = (user: CreateBusinessUserDtoType) => {
  let accountImageUrl = "";
  if (user.accountImageUrl === "" || user.accountImageUrl === null || user.accountImageUrl === undefined) {
    const stringIdentifier =
      user.familyName || user.givenName || user.middleName || user.username || user.email || user.displayName || "?";
    accountImageUrl = generateAvatarUrl(stringIdentifier);
  } else {
    accountImageUrl = user.accountImageUrl;
  }
  return {
    ...user,
    accountImageUrl,
    roleId: null,
    deleted: false,
    isDisabled: false,
  };
};

export const generateBusinessUsers = (users: CreateBusinessUsersDtoType) => {
  const businessUsers = users.map(user => {
    return generateBusinessUser(user);
  });
  return businessUsers;
};

export const generateClientUser = (user: CreateClientUserDtoType) => {
  let accountImageUrl = "";
  if (user.accountImageUrl === "" || user.accountImageUrl === null || user.accountImageUrl === undefined) {
    const stringIdentifier =
      user.familyName || user.givenName || user.middleName || user.username || user.email || user.displayName || "?";
    accountImageUrl = generateAvatarUrl(stringIdentifier);
  } else {
    accountImageUrl = user.accountImageUrl;
  }
  return {
    ...user,
    accountImageUrl,
    roleId: null,
    deleted: false,
    isDisabled: false,
  };
};

export const generateClientUsers = (users: CreateClientUsersDtoType) => {
  const clientUsers = users.map(user => {
    return generateClientUser(user);
  });
  return clientUsers;
};
