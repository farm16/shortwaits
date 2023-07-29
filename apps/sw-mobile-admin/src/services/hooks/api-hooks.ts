import { shortwaitsApi } from "../shortwaits-api";

export const {
  //Mutations hooks
  useCreateEventMutation,
  useRegisterBusinessMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useLocalSignOutMutation,
  useUpdateBusinessMutation,
  useUpdateBusinessHoursMutation,
  useCreateBusinessClientsMutation,
  useCreateBusinessStaffMutation,
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
  useGetServicesByBusinessQuery,
  useGetUsersQuery,
  useGetEventsByBusinessQuery,
  useGetEventsSummaryByBusinessQuery,
  //Lazy Query hooks
  useLazyGetUsersQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesByBusinessQuery,
  useLazyGetBusinessClientsQuery,
  useLazyGetEventsByBusinessQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
  useLazyGetEventsSummaryByBusinessQuery,
} = shortwaitsApi;
