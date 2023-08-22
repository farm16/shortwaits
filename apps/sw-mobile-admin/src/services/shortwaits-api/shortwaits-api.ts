import { createApi } from "@reduxjs/toolkit/query/react";
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

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: PostLocalSignUp(builder),
    localSignIn: PostLocalSignIn(builder),
    localSignOut: PostLocalSignOut(builder),

    // >>>>> business
    getBusiness: GetBusiness(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessClients: GetBusinessClients(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    updateBusiness: UpdateBusiness(builder),
    updateBusinessHours: UpdateBusinessHours(builder),
    registerBusiness: RegisterBusiness(builder),
    // A business User === Staff
    // A client User === Client also known as a customer
    createBusinessStaff: CreateBusinessStaff(builder),
    createBusinessClients: CreateBusinessClients(builder),
    updateBusinessStaff: CreateBusinessStaff(builder),
    updateBusinessClient: CreateBusinessClients(builder),
    // <<<<< business

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
    // todo: Users
    getUsers: GetUsers(builder),
  }),
});
