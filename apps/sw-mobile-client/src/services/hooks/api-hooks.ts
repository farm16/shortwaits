import { shortwaitsApi } from "../shortwaits-api";

export const {
  //Mutations hooks
  useSocialSignInMutation,
  useSocialSignUpMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useLocalSignOutMutation,
  useUploadImageFileMutation,

  // events - mutations
  useRegisterEventByIdForClientMutation,
  useUpdateEventForClientMutation,

  // events - queries
  useGetEventDetailsForClientQuery,
  useGetEventsDetailsForClientQuery,
  useGetServiceByIdForClientQuery,
  useGetServicesByBusinessIdsForClientQuery,

  // shortwaits admin - queries
  useGetAdminMobileQuery,

  //Lazy Query hooks
  useLazyGetAdminMobileQuery,
  useLazyGetEventDetailsForClientQuery,
} = shortwaitsApi;
