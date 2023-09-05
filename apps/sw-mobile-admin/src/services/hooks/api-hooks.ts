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
  useUpdateBusinessHoursMutation,
  useCreateBusinessClientsMutation,
  useCreateBusinessStaffMutation,
  useUpdateBusinessClientMutation,
  useUpdateBusinessStaffMutation,
  useUpdateEventMutation,
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
  useGetBusinessUsersMutation,
  useGetEventsByBusinessQuery,
  useGetEventsSummaryByBusinessQuery,
  useGetPeopleInEventQuery,
  //Lazy Query hooks
  useLazyGetPeopleInEventQuery,
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
