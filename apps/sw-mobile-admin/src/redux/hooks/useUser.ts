import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserState } from "../slices/user";

export const useUser = () => {
  const user = useSelector(selectCurrentUserState);

  return useMemo(() => user, [user]);
};
