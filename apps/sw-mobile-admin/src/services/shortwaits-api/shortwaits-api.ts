import { createApi } from "@reduxjs/toolkit/query/react";
//modules
import {
  GetEventsByBusiness,
  GetAdminMobile,
  PostLocalSignIn,
  PostLocalSignUp,
  GetBusinessClients,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessStaff,
  GetCategory,
  GetCategories,
  GetService,
  GetServicesByBusiness,
  GetUsers,
  UpdateBusinessHours,
  RegisterBusiness,
  UpdateBusiness,
  CreateBusinessStaff,
  CreateBusinessClients,
  CreateEvent,
  GetEventsSummaryByBusiness,
  PostLocalSignOut,
  GetPeopleInEvent,
} from "./modules";
import { baseQueryWithInterceptor } from "./interceptor";
import { REHYDRATE } from "redux-persist";

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: PostLocalSignUp(builder),
    localSignIn: PostLocalSignIn(builder),
    localSignOut: PostLocalSignOut(builder),
    //business (queries)
    getBusiness: GetBusiness(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessClients: GetBusinessClients(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    //business (mutation)
    updateBusiness: UpdateBusiness(builder),
    updateBusinessHours: UpdateBusinessHours(builder),
    registerBusiness: RegisterBusiness(builder),
    //business Users (mutation) STAFF !!!
    createBusinessStaff: CreateBusinessStaff(builder),
    //client Users (mutation) CLIENT !!!
    createBusinessClients: CreateBusinessClients(builder),
    // todo: pending
    getUsers: GetUsers(builder),
    //categories
    getCategory: GetCategory(builder),
    getCategories: GetCategories(builder),
    //services
    getService: GetService(builder),
    getServicesByBusiness: GetServicesByBusiness(builder),
    //events
    createEvent: CreateEvent(builder),
    getEventsByBusiness: GetEventsByBusiness(builder),
    getEventsSummaryByBusiness: GetEventsSummaryByBusiness(builder),
    getPeopleInEvent: GetPeopleInEvent(builder),
  }),
});
