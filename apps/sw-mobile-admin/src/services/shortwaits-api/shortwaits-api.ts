import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./interceptor";
import {
  AddClientToBusiness,
  CreateBusinessLocalClients,
  CreateBusinessStaff,
  CreateEvent,
  CreateLocalClients,
  CreateService,
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
  GetLocalClients,
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
    getBusinessStaff: GetBusinessStaff(builder),

    updateBusiness: UpdateBusiness(builder),
    registerBusiness: RegisterBusiness(builder),
    // A business User === Staff

    // A client User === Client also known as a customer
    createBusinessStaff: CreateBusinessStaff(builder),
    createBusinessLocalClients: CreateBusinessLocalClients(builder),
    updateBusinessStaff: UpdateBusinessStaff(builder), // updates single business staff
    updateBusinessLocalClient: UpdateBusinessLocalClient(builder), // updates single business client
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
    getClients: GetClients(builder),
    getLocalClients: GetLocalClients(builder),
    addClientToBusiness: AddClientToBusiness(builder),
    createLocalClients: CreateLocalClients(builder),
    getStaff: GetStaff(builder),

    //file uploads
    uploadImageFile: UploadImageFile(builder),
  }),
});
