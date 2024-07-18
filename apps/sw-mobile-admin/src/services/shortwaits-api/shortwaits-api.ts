import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./interceptor";
import {
  AddClientToBusiness,
  CreateBusinessLocalClients,
  CreateBusinessUser,
  CreateService,
  DeleteBusinessLocalClients,
  DeleteBusinessUser,
  DeleteService,
  GetAdminMobile,
  GetAllBusinessClients,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessUser,
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
  UpdateBusinessLocalClient,
  UpdateBusinessUser,
  UpdateService,
  UploadImageFile,
  createBusinessEvent,
  getBusinessEventPeople,
  getBusinessEventSummary,
  getBusinessEvents,
  updateBusinessEvent,
  updateBusinessEventStatus,
  updateClientsInBusinessEvent,
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
    getBusinessCategory: GetBusinessCategory(builder), // this only return _ids
    getBusinessServices: GetBusinessServices(builder), // this only return _ids
    getAllBusinessClients: GetAllBusinessClients(builder), // this only return _ids

    //business staff
    getStaff: GetStaff(builder),
    getBusinessUser: GetBusinessUser(builder),
    createBusinessUser: CreateBusinessUser(builder),
    deleteBusinessUser: DeleteBusinessUser(builder), // ! <- deletes single business staff | TODO: delete multiple staff
    updateBusinessUser: UpdateBusinessUser(builder), // updates single business staff

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

    //business events
    createBusinessEvent: createBusinessEvent(builder),
    updateBusinessEvent: updateBusinessEvent(builder),
    getBusinessEvents: getBusinessEvents(builder),
    getBusinessEventSummary: getBusinessEventSummary(builder),
    getBusinessEventPeople: getBusinessEventPeople(builder),
    updateClientsInBusinessEvent: updateClientsInBusinessEvent(builder),
    updateBusinessEventStatus: updateBusinessEventStatus(builder),

    //clients
    getClients: GetClients(builder),
    addClientToBusiness: AddClientToBusiness(builder),

    //file uploads
    uploadImageFile: UploadImageFile(builder),
  }),
});
