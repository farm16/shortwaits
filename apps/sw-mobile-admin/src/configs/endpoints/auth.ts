export const AUTH = {
  adminLocalSignUp: {
    getPath: () => "/auth/admin/local/sign-up",
    METHOD: "POST",
  },
  adminLocalSignIn: {
    getPath: () => "/auth/admin/local/sign-in",
    METHOD: "POST",
  },
  adminLocalSignOut: {
    getPath: () => "/auth/admin/local/sign-out",
    METHOD: "POST",
  },
  signOut: {
    getPath: () => "/auth/sign-out",
    METHOD: "POST",
  },
  refreshToken: {
    getPath: () => "/auth/refresh",
    METHOD: "POST",
  },
};
