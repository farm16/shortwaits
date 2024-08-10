import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentBusinessUsersState } from "../slices/business-users";

export const useBusinessUsers = () => {
  const businessUsers = useSelector(selectCurrentBusinessUsersState);

  return useMemo(() => businessUsers, [businessUsers]);
};

export const useBusinessUser = (id: string) => {
  const businessUsers = useBusinessUsers();
  return useMemo(() => businessUsers.find(item => item._id === id), [businessUsers, id]);
};
