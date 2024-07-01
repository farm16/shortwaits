import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./interceptor";
import {
  AddClientToBusiness,
  CreateBusinessLocalClients,
  CreateBusinessStaff,
  CreateEvent,
  CreateService,
  DeleteBusinessLocalClients,
  DeleteBusinessStaff,
  DeleteService,
  GetAdminMobile,
  GetAllBusinessClients,
  GetBusiness,
  GetBusinessCategory,
  GetBusinessHours,
  GetBusinessServices,
  GetBusinessStaff,
  GetCategories,
  GetCategory,
  GetClients,
  GetEventsByBusiness,
  GetEventsSummaryByBusiness,
  GetPeopleInEvent,
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
  UpdateBusinessStaff,
  UpdateEvent,
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

    // >>>>> business
    getBusiness: GetBusiness(builder),
    getBusinessHours: GetBusinessHours(builder),

    // this only return _ids
    getBusinessCategory: GetBusinessCategory(builder),
    getBusinessServices: GetBusinessServices(builder),
    getAllBusinessClients: GetAllBusinessClients(builder),

    updateBusiness: UpdateBusiness(builder),
    registerBusiness: RegisterBusiness(builder),

    // ! A business User === Staff
    getBusinessStaff: GetBusinessStaff(builder),
    createBusinessStaff: CreateBusinessStaff(builder),
    deleteBusinessStaff: DeleteBusinessStaff(builder), // ! <- deletes single business staff | TODO: delete multiple staff
    updateBusinessStaff: UpdateBusinessStaff(builder), // updates single business staff

    // ! A client User === Customer
    createBusinessLocalClients: CreateBusinessLocalClients(builder),
    deleteBusinessLocalClients: DeleteBusinessLocalClients(builder),
    updateBusinessLocalClient: UpdateBusinessLocalClient(builder), // ! <- Updates single local client

    // <<<<<

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
    getClients: GetClients(builder),
    addClientToBusiness: AddClientToBusiness(builder),
    getStaff: GetStaff(builder),

    //file uploads
    uploadImageFile: UploadImageFile(builder),
  }),
});
