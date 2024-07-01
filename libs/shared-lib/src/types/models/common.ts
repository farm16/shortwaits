export type ClientRegistration = {
  isRegistered: boolean; // if the user has completed the registration process ( code 2)
  registrationType: "local" | "social" | "business"; // the type of registration
  state: {
    screenName?: string;
    // 0: not started, 1: pending, 2: completed , 3:verified, 4: failed, 5: blocked, 6: aborted, 7: frozen( when is business local client)
    state: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    messages?: string[]; // messages to be displayed to the user based on the state
    isPendingVerification: boolean; // if the user has completed the registration process but the email is not verified yet
  };
};
