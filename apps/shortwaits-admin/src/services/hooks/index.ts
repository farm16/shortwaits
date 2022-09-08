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
