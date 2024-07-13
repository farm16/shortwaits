import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./interceptor";
import {
  AddClientToBusiness,
  CreateBusinessEvent,
  CreateBusinessLocalClients,
  CreateBusinessStaff,
  CreateService,
  DeleteBusinessLocalClients,
  DeleteBusinessStaff,
  DeleteService,
  GetAdminMobile,
  GetAllBusinessClients,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessEventPeople,
  GetBusinessEventSummary,
  GetBusinessEvents,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessStaff,
  GetCategories,
  GetCategory,
  GetClients,
  GetService,
  GetServices,
  GetStaff,
  PostLocalSignIn,
  PostLocalSignOut,
  PostLocalSignUp,
  PostSocialSignIn,
  PostSocialSignUp,
  RegisterBusiness,
  UpdateBusiness,
  UpdateBusinessEvent,
  UpdateBusinessLocalClient,
  UpdateBusinessStaff,
  UpdateService,
  UploadImageFile,
} from "./modules";

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

    //business
    getBusiness: GetBusiness(builder),
    getBusinessHours: GetBusinessHours(builder),
    updateBusiness: UpdateBusiness(builder),
    registerBusiness: RegisterBusiness(builder),
    // this only return _ids
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessServices: GetBusinessServices(builder),
    getAllBusinessClients: GetAllBusinessClients(builder),

    //business staff
    getStaff: GetStaff(builder),
    getBusinessStaff: GetBusinessStaff(builder),
    createBusinessStaff: CreateBusinessStaff(builder),
    deleteBusinessStaff: DeleteBusinessStaff(builder), // ! <- deletes single business staff | TODO: delete multiple staff
    updateBusinessStaff: UpdateBusinessStaff(builder), // updates single business staff

    //business clients
    createBusinessLocalClients: CreateBusinessLocalClients(builder),
    deleteBusinessLocalClients: DeleteBusinessLocalClients(builder),
    updateBusinessLocalClient: UpdateBusinessLocalClient(builder), // ! <- Updates single local client

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
    createBusinessEvent: CreateBusinessEvent(builder),
    updateBusinessEvent: UpdateBusinessEvent(builder),
    getBusinessEvents: GetBusinessEvents(builder),
    getBusinessEventSummary: GetBusinessEventSummary(builder),
    GetBusinessEventPeople: GetBusinessEventPeople(builder),

    //clients
    getClients: GetClients(builder),
    addClientToBusiness: AddClientToBusiness(builder),

    //file uploads
    uploadImageFile: UploadImageFile(builder),
  }),
});
