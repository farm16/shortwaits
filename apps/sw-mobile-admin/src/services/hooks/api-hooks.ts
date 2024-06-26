import { shortwaitsApi } from "../shortwaits-api";

export const {
  //Mutations hooks
  useCreateEventMutation,
  useRegisterBusinessMutation,
  useSocialSignInMutation,
  useSocialSignUpMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useLocalSignOutMutation,
  useUpdateBusinessMutation,
  useCreateBusinessLocalClientsMutation,
  useUpdateBusinessLocalClientMutation,
  useCreateBusinessStaffMutation,
  useUpdateBusinessStaffMutation,
  useDeleteBusinessStaffMutation,
  useUpdateEventMutation,
  useUpdateServiceMutation,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUploadImageFileMutation,
  useCreateLocalClientsMutation,
  useAddClientToBusinessMutation,

  //Query hooks
  useGetAdminMobileQuery,
  useGetAllBusinessClientsQuery,
  useGetBusinessQuery,
  useGetBusinessCategoryQuery,
  useGetBusinessHoursQuery,
  useGetBusinessServicesQuery,
  useGetBusinessStaffQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetServiceQuery,
  useGetServicesQuery,
  useGetEventsByBusinessQuery,
  useGetEventsSummaryByBusinessQuery,
  useGetPeopleInEventQuery,
  useGetClientsQuery,
  useGetLocalClientsQuery,
  useGetStaffQuery,

  //Lazy Query hooks
  useLazyGetPeopleInEventQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesQuery,
  useLazyGetAllBusinessClientsQuery,
  useLazyGetEventsByBusinessQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
  useLazyGetEventsSummaryByBusinessQuery,
  useLazyGetClientsQuery,
  useLazyGetLocalClientsQuery,
  useLazyGetStaffQuery,
} = shortwaitsApi;
