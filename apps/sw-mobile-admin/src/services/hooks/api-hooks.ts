import { shortwaitsApi } from "../shortwaits-api";

export const {
  usePrefetch,

  //Mutations hooks
  useRegisterBusinessMutation,
  useSocialSignInMutation,
  useSocialSignUpMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useLocalSignOutMutation,
  useUpdateBusinessMutation,
  useCreateBusinessLocalClientsMutation,
  useDeleteBusinessLocalClientsMutation,
  useUpdateBusinessLocalClientMutation,
  useCreateBusinessStaffMutation,
  useUpdateBusinessStaffMutation,
  useDeleteBusinessStaffMutation,
  useUpdateServiceMutation,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUploadImageFileMutation,
  useAddClientToBusinessMutation,
  // business event mutations
  useCreateBusinessEventMutation,
  useUpdateBusinessEventMutation,
  useRegisterClientsToBusinessEventMutation,
  useRegisterLocalClientsToBusinessEventMutation,
  useRegisterMultipleToBusinessEventMutation,
  useWithdrawMultipleFromBusinessEventMutation,
  useUpdateBusinessEventStatusMutation,

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
  useGetBusinessEventsQuery,
  useGetBusinessEventSummaryQuery,
  useGetBusinessEventPeopleQuery,
  useGetClientsQuery,
  useGetStaffQuery,

  //Lazy Query hooks
  useLazyGetBusinessEventPeopleQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesQuery,
  useLazyGetAllBusinessClientsQuery,
  useLazyGetBusinessEventsQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
  useLazyGetBusinessEventSummaryQuery,
  useLazyGetClientsQuery,
  useLazyGetStaffQuery,
} = shortwaitsApi;
