import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetEventsByBusiness,
  GetAdminMobile,
  PostLocalSignIn,
  PostLocalSignUp,
  PostSocialSignIn,
  PostSocialSignUp,
  GetBusinessClients,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessStaff,
  GetCategory,
  GetCategories,
  GetService,
  GetServices,
  UpdateService,
  CreateService,
  GetBusinessUsers,
  RegisterBusiness,
  UpdateBusiness,
  CreateBusinessStaff,
  CreateBusinessClients,
  CreateEvent,
  GetEventsSummaryByBusiness,
  PostLocalSignOut,
  GetPeopleInEvent,
  UpdateEvent,
  UpdateBusinessStaff,
  UpdateBusinessClient,
  DeleteService,
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
    socialSignIn: PostSocialSignIn(builder),
    socialSignUp: PostSocialSignUp(builder),

    // >>>>> business
    getBusiness: GetBusiness(builder),
    getBusinessHours: GetBusinessHours(builder),

    // this only return _ids
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessClients: GetBusinessClients(builder),
    getBusinessStaff: GetBusinessStaff(builder),

    updateBusiness: UpdateBusiness(builder),
    registerBusiness: RegisterBusiness(builder),
    // A business User === Staff

    // A client User === Client also known as a customer
    createBusinessStaff: CreateBusinessStaff(builder),
    createBusinessClients: CreateBusinessClients(builder),
    updateBusinessStaff: UpdateBusinessStaff(builder), // updates single business staff
    updateBusinessClient: UpdateBusinessClient(builder), // updates single business client
    // <<<<< business

    //categories
    getCategory: GetCategory(builder),
    getCategories: GetCategories(builder),

    //services
    getService: GetService(builder),
    getServices: GetServices(builder),
    updateService: UpdateService(builder),
    createService: CreateService(builder),
    deleteService: DeleteService(builder),

    //events
    createEvent: CreateEvent(builder),
    updateEvent: UpdateEvent(builder),
    getEventsByBusiness: GetEventsByBusiness(builder),
    getEventsSummaryByBusiness: GetEventsSummaryByBusiness(builder),
    getPeopleInEvent: GetPeopleInEvent(builder),
    // todo: Users
    getBusinessUsers: GetBusinessUsers(builder),
  }),
});
