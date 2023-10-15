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
  useCreateBusinessClientsMutation,
  useCreateBusinessStaffMutation,
  useUpdateBusinessClientMutation,
  useUpdateBusinessStaffMutation,
  useGetBusinessUsersMutation,
  useUpdateEventMutation,
  useUpdateServiceMutation,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUploadImageFileMutation,

  //Query hooks
  useGetAdminMobileQuery,
  useGetBusinessClientsQuery,
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

  //Lazy Query hooks
  useLazyGetPeopleInEventQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesQuery,
  useLazyGetBusinessClientsQuery,
  useLazyGetEventsByBusinessQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
  useLazyGetEventsSummaryByBusinessQuery,
} = shortwaitsApi;
