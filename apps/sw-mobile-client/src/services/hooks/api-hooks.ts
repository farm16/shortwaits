import { shortwaitsApi } from '../shortwaits-api';

export const {
  //Mutations hooks
  useSocialSignInMutation,
  useSocialSignUpMutation,
  useLocalSignUpMutation,
  useLocalSignInMutation,
  useLocalSignOutMutation,
  useUploadImageFileMutation,

  //Query hooks
  useGetAdminMobileQuery,

  //Lazy Query hooks
  useLazyGetAdminMobileQuery,
} = shortwaitsApi;
