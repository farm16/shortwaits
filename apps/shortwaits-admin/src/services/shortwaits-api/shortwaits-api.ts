import { createApi } from "@reduxjs/toolkit/query/react";
//modules
import {
  GetAllBusinessEvents,
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
} from "./modules";
import { baseQueryWithInterceptor } from "./interceptor";

export const shortwaitsApi = createApi({
  reducerPath: "shortwaitsApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    //default mobile data
    getAdminMobile: GetAdminMobile(builder),
    //auth
    localSignUp: GetLocalSignUp(builder),
    localSignIn: GetLocalSignIn(builder),
    //business
    getBusiness: GetBusiness(builder),
    getBusinessClients: GetBusinessClients(builder),
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessHours: GetBusinessHours(builder),
    getBusinessServices: GetBusinessServices(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    updateBusinessServices: UpdateBusinessServices(builder),
    updateBusiness: UpdateBusiness(builder),
    updateBusinessHours: UpdateBusinessHours(builder),
    registerBusiness: RegisterBusiness(builder),
    //categories (business)
    getCategory: GetCategory(builder),
    getCategories: GetCategories(builder),
    //services (business)
    getService: GetService(builder),
    getServicesByBusiness: GetServicesByBusiness(builder),
    //user
    getUser: GetUser(builder),
    //events
    getAllBusinessEvents: GetAllBusinessEvents(builder),
  }),
});
