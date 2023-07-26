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
  GetUser,
  UpdateBusinessHours,
  RegisterBusiness,
  UpdateBusiness,
  CreateBusinessStaff,
  CreateBusinessClients,
  CreateEvent,
  GetEventsSummaryByBusiness,
  PostLocalSignOut,
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
    getBusinessClients: GetBusinessClients(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    //business (mutation)
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
