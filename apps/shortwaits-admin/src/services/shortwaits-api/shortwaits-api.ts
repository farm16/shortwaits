import { createApi } from "@reduxjs/toolkit/query/react";
//modules
import {
  GetEventsByBusiness,
  GetAdminMobile,
  GetLocalSignIn,
  GetLocalSignUp,
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
  GetUser,
  UpdateBusinessServices,
  UpdateBusinessHours,
  RegisterBusiness,
  UpdateBusiness,
  CreateBusinessStaff,
  CreateBusinessClients,
  CreateEvent,
  GetEventsSummaryByBusiness,
} from "./modules";
import { baseQueryWithInterceptor } from "./interceptor";

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: GetLocalSignUp(builder),
    localSignIn: GetLocalSignIn(builder),
    //business (queries)
    getBusiness: GetBusiness(builder),
    getBusinessClients: GetBusinessClients(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    //business (mutation)
    updateBusinessServices: UpdateBusinessServices(builder),
    updateBusiness: UpdateBusiness(builder),
    updateBusinessHours: UpdateBusinessHours(builder),
    registerBusiness: RegisterBusiness(builder),
    createBusinessStaff: CreateBusinessStaff(builder),
    createBusinessClients: CreateBusinessClients(builder),
    //categories
    getCategory: GetCategory(builder),
    getCategories: GetCategories(builder),
    //services
    getService: GetService(builder),
    getServicesByBusiness: GetServicesByBusiness(builder),
    //user
    getUser: GetUser(builder),
    //events
    createEvent: CreateEvent(builder),
    getEventsByBusiness: GetEventsByBusiness(builder),
    getEventsSummaryByBusiness: GetEventsSummaryByBusiness(builder),
  }),
});
