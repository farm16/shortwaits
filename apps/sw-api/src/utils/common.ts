import {
  AddClientDtoType,
  BusinessUserType,
  EventDtoType,
  EventType,
  ObjectId,
  ObjectId as ObjectIdType,
  ServiceDtoType,
  ServiceType,
  generateAvatarUrl,
  generateShortId,
} from "@shortwaits/shared-lib";
import { Types } from "mongoose";
import { customAlphabet } from "nanoid";
import { SignUpWithEmailDto } from "../api/auth/dto";
import { CreateBusinessUserDto } from "../api/business-users/dto";
import { CreateEventsDto } from "../api/events/business/dto";

export function generateUniqueId(idLength = 16) {
  const generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", idLength);
  const shortId = generateShortId();
  return shortId;
}

export function getUniqueIdArray(array: ObjectIdType[]) {
  return [...new Set(array)];
}

export const convertStringIdToObjectId = (id: string) => {
  if (!id) {
    return null;
  }
  return new Types.ObjectId(id);
};

export const convertStringIdsToObjectIds = (ids: string[]) => {
  // check if ids are not undefined or array is empty
  if (!ids || ids.length === 0) {
    return null;
  }
  return ids.map(id => convertStringIdToObjectId(id));
};

export const generateDateFromIsoString = (date: string) => {
  if (!date) {
    return null;
  }
  return new Date(date);
};

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
    deviceSettings: undefined,
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
  const staffIds = convertStringIdsToObjectIds(event.staffIds) ?? [];
  const clientsIds = convertStringIdsToObjectIds(event.clientsIds) ?? [];
  const localClientsIds = convertStringIdsToObjectIds(event.localClientsIds) ?? [];
  const participantsIds = convertStringIdsToObjectIds(event.participantsIds) ?? [];
  const createdBy = convertStringIdToObjectId(userId);
  const updatedBy = convertStringIdToObjectId(userId);
  const businessId = convertStringIdToObjectId(event.businessId);
  const leadClientId = convertStringIdToObjectId(event.leadClientId);
  const serviceId = convertStringIdToObjectId(event.serviceId);
  const startTime = generateDateFromIsoString(event.startTime);
  const endTime = generateDateFromIsoString(event.endTime);
  const expectedEndTime = generateDateFromIsoString(event.expectedEndTime);

  const filteredEvent: Partial<EventType> = {
    createdBy: createdBy,
    updatedBy: updatedBy,
    shortId: generateShortId(8), // generate shortId with 8 characters
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
    name: event.name,
    description: event.description,
    eventImage: event.eventImage,
    features: event.features,
    hasDuration: event.hasDuration,
    durationInMin: event.durationInMin,
    participantsIds: participantsIds,
    staffIds: staffIds,
    clientsIds: clientsIds,
    localClientsIds: localClientsIds,
    businessId: businessId,
    leadClientId: leadClientId,
    serviceId: serviceId,
    startTime: startTime,
    endTime: endTime,
    expectedEndTime: expectedEndTime,
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

export const generateUpdatedEvent = (event: EventDtoType, userId: string) => {
  const staffIds = convertStringIdsToObjectIds(event.staffIds) ?? [];
  const clientsIds = convertStringIdsToObjectIds(event.clientsIds) ?? [];
  const localClientsIds = convertStringIdsToObjectIds(event.localClientsIds) ?? [];
  const participantsIds = convertStringIdsToObjectIds(event.participantsIds) ?? [];
  const updatedBy = convertStringIdToObjectId(userId);
  const leadClientId = convertStringIdToObjectId(event.leadClientId);
  const serviceId = convertStringIdToObjectId(event.serviceId);
  const startTime = generateDateFromIsoString(event.startTime);
  const endTime = generateDateFromIsoString(event.endTime);
  const expectedEndTime = generateDateFromIsoString(event.expectedEndTime);

  const filteredEvent: Omit<EventType, "createdBy" | "businessId"> = {
    // createdBy: createdBy,
    updatedBy: updatedBy,
    priceFinal: event.priceExpected,
    cancellationReason: event.cancellationReason,
    paymentMethod: event.paymentMethod ?? "CASH",
    name: event.name,
    description: event.description,
    eventImage: event.eventImage,
    features: event.features,
    hasDuration: event.hasDuration,
    durationInMin: event.durationInMin,
    participantsIds: participantsIds,
    staffIds: staffIds,
    clientsIds: clientsIds,
    localClientsIds: localClientsIds,
    leadClientId: leadClientId,
    serviceId: serviceId,
    startTime: startTime,
    endTime: endTime,
    expectedEndTime: expectedEndTime,
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
    shortId: event.shortId,
    status: event.status,
    canceled: event.canceled,
    isPublicEvent: event.isPublicEvent,
    deleted: event.deleted,
    discountAmount: event.discountAmount,
    availableDiscountCodes: event.availableDiscountCodes,
    selectedDiscountCode: event.selectedDiscountCode,
  };
  return filteredEvent;
};

const newBusinessOwnerRoles = {
  isStaff: false,
  isAdmin: true,
  isSuperAdmin: true,
  isBackgroundAdmin: true,
} as const;
/**
 * @description
 * this inits values for business users
 **/
export const filterBusinessOwnerPayload_localAuth = (ownerSignupDto: SignUpWithEmailDto): BusinessUserType => {
  const filteredBusinessUser: BusinessUserType = {
    alias: "username",
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
    birthday: null,
    hours: null,

    // require
    username: ownerSignupDto?.username,
    email: ownerSignupDto?.email,
    isEmailVerified: false,
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
    shortId: generateShortId(6), // generate shortId with 8 characters
    isSocialAccount: false,
    deviceSettings: [
      {
        deviceUuid: "",
        hasExportedContacts: false,
        isEmailVerified: false,
        isPhoneVerified: false,
        isTwoFactorEnabled: false,
        isTwoFactorVerified: false,
        isTouchIdEnabled: false,
        isTouchIdVerified: false,
        isFaceIdEnabled: false,
        isFaceIdVerified: false,
        isPasswordlessEnabled: false,
      },
    ],
    accountSettings: {
      isDarkModeEnabled: false,
      isNotificationsEnabled: false,
      isLocationEnabled: false,
      isLocationShared: false,
      isLocationSharedWithBusinesses: false,
    },
  };
  return filteredBusinessUser;
};

export const filterBusinessOwnerPayload_socialAuth = (ownerSignupDto: SignUpWithEmailDto) => {
  const filteredBusinessUser: BusinessUserType = {
    alias: "username",
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
    shortId: generateShortId(6), // generate shortId with 8 characters
    isSocialAccount: false,
    deviceSettings: [
      {
        deviceUuid: "",
        hasExportedContacts: false,
        isEmailVerified: false,
        isPhoneVerified: false,
        isTwoFactorEnabled: false,
        isTwoFactorVerified: false,
        isTouchIdEnabled: false,
        isTouchIdVerified: false,
        isFaceIdEnabled: false,
        isFaceIdVerified: false,
        isPasswordlessEnabled: false,
      },
    ],
    accountSettings: {
      isDarkModeEnabled: false,
      isNotificationsEnabled: false,
      isLocationEnabled: false,
      isLocationShared: false,
      isLocationSharedWithBusinesses: false,
    },
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

export const generateServiceRecordPayload = (userId: ObjectId, businessId: ObjectId, service: Partial<ServiceType>) => {
  const applicableCategories = service.applicableCategories ?? [];
  const staff = service.staff ?? [];
  const createdBy = userId;
  const updatedBy = userId;

  const servicePayload: ServiceType = {
    businessId: businessId,
    name: service.name,
    description: service.description,
    hours: service.hours,
    applicableCategories: applicableCategories,
    staff: staff,
    durationInMin: service.durationInMin,
    price: service.price ?? 0,
    currency: "USD", // this is a default value for now todo: change this to a dynamic value
    isPrivate: service.isPrivate,
    urls: service.urls ?? null,
    isVideoConference: service.isVideoConference ?? false,
    deleted: false,
    serviceColor: service.serviceColor ?? null,
    imageUrl: generateAvatarUrl(service.name ?? "service", service.serviceColor.hexCode ?? "000000"),
    createdBy: createdBy,
    updatedBy: updatedBy,
  };
  return servicePayload;
};

export const updateServiceRecord = (userId: ObjectId, businessId: ObjectId, service: ServiceType) => {
  const filetedServiceRecord = filterServiceRecord(service);
  const servicePayload = {
    ...filetedServiceRecord,
    updatedBy: userId,
  };
  return servicePayload;
};

export function removeNullValuesFromObject(obj: Record<string, any>) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export function convertBusinessServiceDtoToRecord(service: Partial<ServiceDtoType>): ServiceType {
  const convertedFields = {
    _id: convertStringIdToObjectId(service._id),
    staff: convertStringIdsToObjectIds(service.staff),
    applicableCategories: convertStringIdsToObjectIds(service.applicableCategories),
    businessId: convertStringIdToObjectId(service.businessId),
    createdBy: convertStringIdToObjectId(service.createdBy),
    updatedBy: convertStringIdToObjectId(service.updatedBy),
    createdAt: generateDateFromIsoString(service.createdAt),
    updatedAt: generateDateFromIsoString(service.updatedAt),
  };

  return {
    ...service,
    ...(removeNullValuesFromObject(convertedFields) as typeof convertedFields),
  } as ServiceType;
}

export function convertToLowercase(text: string) {
  return text.toLowerCase();
}

export function validateId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

type PrintModule = "EventTransactionsService" | "none";
type PrintArgs = { module: PrintModule; message: string; value: any };
export const print = (args: PrintArgs) => {
  const { module = "none", message } = args;
  let { value } = args;

  const modules = {
    none: "none",
    EventTransactionsService: "EventTransactionsService",
  };
  // if value is an object, print it as JSON
  if (typeof value === "object") {
    value = JSON.stringify(value, null, 2);
  }

  console.log(`[MODULE :${modules[module]}]`);
  console.log(`${message} >>>`, value);
};
