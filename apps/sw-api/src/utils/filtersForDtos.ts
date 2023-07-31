import { CreateBusinessUserDto } from "../api/business-user/dto";
import { CreateClientUserDto } from "../api/client-user/dto";
import { CreateEventsDto } from "../api/events/dto/create-event.dto";

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
    isGroupEvent: event.clientsIds.length > 1,
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
