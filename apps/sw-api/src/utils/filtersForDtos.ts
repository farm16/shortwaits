import { BusinessUserType, ConvertToDtoType } from "@shortwaits/shared-lib";
import { CreateBusinessUserDto } from "../api/business-user/dto";
import { CreateClientUserDto } from "../api/client-user/dto";
import { CreateEventsDto } from "../api/events/dto/create-event.dto";
import { SignUpWithEmailDto } from "../api/auth/dto/sign-up-with-email.dto";

export const getFilteredClientUser = (createCustomerDto: CreateClientUserDto) => {
  const filteredClientUser = {
    clientType: createCustomerDto?.clientType,
    username: createCustomerDto?.username,
    alias: createCustomerDto?.alias,
    displayName: createCustomerDto?.displayName,
    familyName: createCustomerDto?.familyName,
    givenName: createCustomerDto?.givenName,
    middleName: createCustomerDto?.middleName,
    accountImageUrl: createCustomerDto?.accountImageUrl,
    email: createCustomerDto?.email,
    password: createCustomerDto?.password,
    locale: createCustomerDto?.locale,
    phoneNumbers: createCustomerDto?.phoneNumbers,
    imAddresses: createCustomerDto?.imAddresses,
    addresses: createCustomerDto?.addresses,
    socialAccounts: createCustomerDto?.socialAccounts,
    desiredCurrencies: createCustomerDto?.desiredCurrencies,
  };
  return filteredClientUser;
};

export const getFilteredBusinessUser = (createCustomerDto: CreateBusinessUserDto) => {
  const filteredBusinessUser = {
    username: createCustomerDto?.username,
    preferredAlias: createCustomerDto?.preferredAlias,
    displayName: createCustomerDto?.displayName,
    familyName: createCustomerDto?.familyName,
    givenName: createCustomerDto?.givenName,
    middleName: createCustomerDto?.middleName,
    accountImageUrl: createCustomerDto?.accountImageUrl,
    email: createCustomerDto?.email,
    password: createCustomerDto?.password,
    locale: createCustomerDto?.locale,
    phoneNumbers: createCustomerDto?.phoneNumbers,
    imAddresses: createCustomerDto?.imAddresses,
    addresses: createCustomerDto?.addresses,
    socialAccounts: createCustomerDto?.socialAccounts,
    desiredCurrencies: createCustomerDto?.desiredCurrencies,
  };
  return filteredBusinessUser;
};

export const getFilteredNewEvent = (event: CreateEventsDto, userId: string) => {
  const filteredEvent = {
    participantsIds: event.participantsIds,
    staffIds: event.staffIds,
    clientsIds: event.clientsIds,
    businessId: event.businessId,
    createdBy: userId,
    updatedBy: userId,
    leadClientId: event.leadClientId,
    name: event.name,
    description: event.description,
    eventImage: event.eventImage,
    serviceId: event.serviceId,
    features: event.features,
    status: {
      statusCode: 0,
      statusName: "PENDING",
    },
    hasNoDuration: event.hasNoDuration,
    durationInMin: event.durationInMin,
    startTime: event.startTime,
    endTime: event.endTime,
    endTimeExpected: event.endTimeExpected,
    priceExpected: event.priceExpected,
    priceFinal: event.priceExpected,
    isPublicEvent: event.clientsIds.length > 1,
    repeat: event.repeat,
    payment: event.payment,
    notes: event.notes,
    labels: event.labels,
    urls: event.urls,
    deleted: false,
    canceled: false,
    location: event.location,
    attendeeLimit: event.attendeeLimit,
    registrationDeadline: event.registrationDeadline,
    registrationFee: event.registrationFee,
  };
  return filteredEvent;
};

export const getFilteredNewBusinessOwner = (ownerSignupDto: SignUpWithEmailDto): ConvertToDtoType<BusinessUserType> => {
  const filteredBusinessUser: ConvertToDtoType<BusinessUserType> = {
    preferredAlias: "username",
    displayName: null,
    familyName: null,
    givenName: null,
    middleName: null,
    accountImageUrl: null,
    locale: null,
    phoneNumbers: null,
    imAddresses: null,
    addresses: null,
    socialAccounts: null,
    desiredCurrencies: null,
    primaryPhoneNumberLabel: null,
    birthday: null,
    hours: null,

    // require
    username: ownerSignupDto?.username,
    email: ownerSignupDto?.email,
    isEmailVerified: false,
    password: ownerSignupDto?.password,
    isPasswordProtected: true,
    isDisabled: false,
    isStaff: false,
    createdByBusinessId: null,
    deleted: false,

    roleId: null,
    registrationState: {
      screenName: null,
      state: 0,
      isCompleted: false,
    },

    // below will get overridden by the Auth service
    businesses: null,
    hashedRt: null,
    lastSignInAt: null,
    // `createdAt` and `updatedAt` will get overridden by the Mongoose schema
    createdAt: null,
    updatedAt: null,
  };
  return filteredBusinessUser;
};

export const getNewUserFromSocialAccount = (ownerSignupDto: SignUpWithEmailDto): ConvertToDtoType<BusinessUserType> => {
  const filteredBusinessUser: ConvertToDtoType<BusinessUserType> = {
    preferredAlias: "username",
    displayName: null,
    familyName: null,
    givenName: null,
    middleName: null,
    accountImageUrl: null,
    locale: null,
    phoneNumbers: null,
    imAddresses: null,
    addresses: null,
    socialAccounts: null,
    desiredCurrencies: null,
    primaryPhoneNumberLabel: null,
    birthday: null,
    hours: null,

    // require
    username: ownerSignupDto?.email,
    email: ownerSignupDto?.email,
    isEmailVerified: true,
    password: ownerSignupDto?.password,
    isPasswordProtected: true,
    isDisabled: false,
    isStaff: false,
    createdByBusinessId: null,
    deleted: false,

    roleId: null,
    registrationState: {
      screenName: null,
      state: 0,
      isCompleted: false,
    },

    // below will get overridden by the Auth service
    businesses: null,
    hashedRt: null,
    lastSignInAt: null,
    // `createdAt` and `updatedAt` will get overridden by the Mongoose schema
    createdAt: null,
    updatedAt: null,
  };
  return filteredBusinessUser;
};
