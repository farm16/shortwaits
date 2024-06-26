import { AddClientDtoType, BusinessUserType, EventDtoType, UpdateServiceDtoType, generateAvatarUrl, generateShortId } from "@shortwaits/shared-lib";
import { SignUpWithEmailDto } from "../api/auth/dto";
import { CreateBusinessUserDto } from "../api/business-staff/dto";
import { CreateEventsDto } from "../api/events/business-events/dto";

export const getFilteredClientUser = (createCustomerDto: Partial<AddClientDtoType>) => {
  const filteredClientUser: AddClientDtoType = {
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
    desiredCurrencies: createCustomerDto?.desiredCurrencies,
    isSocialAccount: false,
    socialAccount: undefined,
    deviceSetting: undefined,
    accountSettings: undefined,
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

export const generateNewEvent = (event: CreateEventsDto, userId: string) => {
  const filteredEvent: Partial<EventDtoType> = {
    createdBy: userId,
    shortId: generateShortId(8), // generate shortId with 8 characters
    updatedBy: userId,
    priceFinal: event.priceExpected,
    deleted: false,
    canceled: false,
    isPublicEvent: true,
    status: {
      statusCode: 0,
      statusName: "PENDING",
    },
    cancellationReason: "",
    paymentMethod: event.paymentMethod ?? "CASH",
    participantsIds: event.participantsIds,
    staffIds: event.staffIds,
    clientsIds: event.clientsIds,
    businessId: event.businessId,
    leadClientId: event.leadClientId,
    name: event.name,
    description: event.description,
    eventImage: event.eventImage,
    serviceId: event.serviceId,
    features: event.features,
    hasDuration: event.hasDuration,
    durationInMin: event.durationInMin,
    startTime: event.startTime,
    endTime: event.endTime,
    expectedEndTime: event.expectedEndTime,
    priceExpected: event.priceExpected,
    repeat: event.repeat,
    payment: event.payment,
    notes: event.notes,
    labels: event.labels,
    urls: event.urls,
    location: event.location,
    attendeeLimit: event.attendeeLimit,
    registrationDeadlineTime: event.registrationDeadlineTime,
    registrationFee: event.registrationFee,
  };
  return filteredEvent;
};

const newBusinessOwnerRoles = {
  isStaff: false,
  isAdmin: true,
  isSuperAdmin: true,
  isBackgroundAdmin: true,
};
/**
 * @description
 * this inits values for business users
 **/
export const filterBusinessOwnerPayload_localAuth = (ownerSignupDto: SignUpWithEmailDto): BusinessUserType => {
  const filteredBusinessUser: BusinessUserType = {
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
    userRoles: newBusinessOwnerRoles,
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

export const filterBusinessOwnerPayload_socialAuth = (ownerSignupDto: SignUpWithEmailDto) => {
  const filteredBusinessUser: BusinessUserType = {
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
    userRoles: newBusinessOwnerRoles,
  };
  return filteredBusinessUser;
};

/**
 * @description
 * This function is used to filter out unwanted keys from the payload
 */
export const filterServiceRecord = payload => {
  const unwantedKeys = ["_id", "businessId", "createdAt", "updatedAt", "__v"];
  const filteredPayload = Object.keys(payload).reduce((acc, key) => {
    if (!unwantedKeys.includes(key)) {
      acc[key] = payload[key];
    }
    return acc;
  }, {});
  return filteredPayload;
};

export const initServiceRecord = (userId: string, businessId: string, updateServiceDto: UpdateServiceDtoType) => {
  const servicePayload: UpdateServiceDtoType = {
    businessId: businessId,
    name: updateServiceDto.name,
    description: updateServiceDto.description,
    hours: updateServiceDto.hours,
    applicableCategories: updateServiceDto.applicableCategories,
    staff: updateServiceDto.staff,
    durationInMin: updateServiceDto.durationInMin,
    price: updateServiceDto.price ?? 0,
    currency: "USD", // this is a default value for now todo: change this to a dynamic value
    isPrivate: updateServiceDto.isPrivate,
    urls: updateServiceDto.urls ?? null,
    isVideoConference: updateServiceDto.isVideoConference ?? false,
    deleted: false,
    serviceColor: updateServiceDto.serviceColor ?? null,
    imageUrl: generateAvatarUrl(updateServiceDto.name ?? "service", updateServiceDto.serviceColor.hexCode ?? "000000"),
    createdBy: userId,
    updatedBy: userId,
  };
  return servicePayload;
};

export const updateServiceRecord = (userId: string, businessId: string, updateServiceDto: UpdateServiceDtoType) => {
  const filetedServiceRecord = filterServiceRecord(updateServiceDto);
  const servicePayload: UpdateServiceDtoType = {
    ...filetedServiceRecord,
    updatedBy: userId,
  };
  return servicePayload;
};
