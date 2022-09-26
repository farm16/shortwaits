import { shortwaitsApi } from "../shortwaits-api";

export const {
  //Mutations hooks
  useRegisterBusinessMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useUpdateBusinessMutation,
  useUpdateBusinessServicesMutation,
  useUpdateBusinessHoursMutation,
  //Query hooks
  useGetBusinessClientsQuery,
  useGetAllBusinessEventsQuery,
  useGetAdminMobileQuery,
  useGetBusinessQuery,
  useGetBusinessCategoryQuery,
  useGetBusinessHoursQuery,
  useGetBusinessServicesQuery,
  useGetBusinessStaffQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetServiceQuery,
  useGetServicesByBusinessQuery,
  useGetUserQuery,
  //Lazy Query hooks
  useLazyGetBusinessClientsQuery,
  useLazyGetAllBusinessEventsQuery,
  useLazyGetUserQuery,
  useLazyGetServiceQuery,
  useLazyGetServicesByBusinessQuery,
  useLazyGetCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetAdminMobileQuery,
  useLazyGetBusinessQuery,
  useLazyGetBusinessCategoryQuery,
  useLazyGetBusinessHoursQuery,
  useLazyGetBusinessServicesQuery,
  useLazyGetBusinessStaffQuery,
} = shortwaitsApi;
