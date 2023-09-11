"use strict";
// import { Document, Types } from "mongoose";
// export type ObjectId = Types.ObjectId;
// export interface ILocale {
//   languageCode: string;
//   scriptCode?: string;
//   countryCode: string;
//   languageTag: string;
//   isRTL: boolean;
// }
// export interface IWelcomeScreenContent {
//   id?: ObjectId;
//   name: string;
//   position: number;
//   title: string;
//   description: string;
// }
// export interface IServiceColors {
//   id?: ObjectId;
//   colorId: number;
//   colorName: string;
//   hexCode: string;
//   isSelected: boolean | null;
//   isDefault: boolean;
// }
// export interface IContacts {
//   nickName: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   address: string;
//   cellPhone: string;
//   phone: string;
//   fax: string;
//   email: string;
//   state: boolean;
//   isVisible: boolean;
//   isPotential: boolean;
//   hasAccount: boolean;
//   stateId: any;
//   noteId: any;
//   createdBy: any;
//   updatedBy: any;
//   deleted: boolean;
// }
// export interface IBusiness {
//   admins: any;
//   superAdmins: any;
//   backgroundAdmins: any;
//   staff: any;
//   users: any;
//   customers: any;
//   description: string;
//   currency: string;
//   country: string;
//   phone1: string;
//   shortName: string;
//   longName: string;
//   category: any;
//   reservationsInfo: any;
//   deliveryInfo: any;
//   hours: any;
//   location: {
//     formattedAddress: string;
//     streetAddress: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//     coordinates: number[];
//   };
//   services: any;
//   isRegistrationCompleted: any;
//   deleted: boolean;
//   createdBy: any;
//   updatedBy: any;
// }
// export interface IAccounts {
//   name: any;
//   other1: any;
//   other2: any;
//   description: any;
//   state: any;
//   createdBy: any;
//   updatedBy: any;
//   deleted: any;
//   sectorId: any;
// }
// export interface IReservations {
//   userId: any;
//   businessId: any;
//   currentEvent: any;
//   confirmationEvent: any;
//   orderType: any;
//   events: any;
//   reservationStartTime: any;
//   reservationEndTime: any;
//   pickupTime: any;
//   deliveryTime: any;
//   businessInfo: any;
//   clientInfo: any;
//   clientMessage: any;
//   businessMessage: any;
//   items: any;
//   charge: any;
//   clientLocation: any;
//   businessLocation: any;
//   state: any;
//   createdBy: any;
//   updatedBy: any;
//   deleted: any;
// }
// export interface ISettings {
//   nameSpace: string;
//   key: string;
//   value: string;
//   state: boolean;
//   order: number;
//   createdBy: any;
//   updatedBy: any;
//   deleted: boolean;
//   isUpgradeable: boolean;
// }
// export interface IUser {
//   userName: string;
//   firstName: string;
//   lastName: string;
//   registrationState: {
//     screenName: string;
//     state: number;
//     isCompleted: boolean;
//   };
//   email: string;
//   password: string;
//   state: boolean;
//   desiredCurrencies: string[];
//   locales: [
//     {
//       countryCode: string;
//       isRTL: boolean;
//       languageCode: string;
//       languageTag: string;
//     }
//   ];
//   businessAccountId: any;
//   deleted: boolean;
//   rolId: any;
//   isAdmin: boolean;
//   isSuperAdmin: boolean;
//   isBackground: boolean;
// }
// export interface IBusinessServicesDoc extends MyBusinessServices, Document {}
// export interface IAccountsDoc extends IAccounts, Document {}
// export interface IBusinessDoc extends IBusiness, Document {}
// export interface IContactsDoc extends IContacts, Document {}
// export interface IReservationsDoc extends IReservations, Document {}
// export interface ISettingsDoc extends ISettings, Document {}
// export interface IUserDoc extends IUser, Document {}
// export interface MyBusinessServices {
//   hours: any;
//   belongsTo: ObjectId;
//   createdBy: ObjectId;
//   updatedBy: ObjectId;
//   name: string;
//   category: ObjectId;
//   durationInMin: number;
//   price: number;
//   currency: string;
//   isPrivate: boolean;
//   urls?: { zoom?: string; other1?: string; other2?: string };
//   isVideoConference: boolean;
//   description: string;
//   deleted: boolean;
// }
// export interface IDayTimeRange {
//   startTime: number;
//   endTime: number;
//   isActive: boolean;
// }
// export interface IBusinessHours {
//   mon: IDayTimeRange[];
//   tue: IDayTimeRange[];
//   wed: IDayTimeRange[];
//   thu: IDayTimeRange[];
//   fri: IDayTimeRange[];
//   sat: IDayTimeRange[];
//   sun: IDayTimeRange[];
// }
//# sourceMappingURL=_backup.js.map