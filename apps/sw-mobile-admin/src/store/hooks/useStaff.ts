import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentStaffState } from "../slices/staff";

export const useStaff = () => {
  const staff = useSelector(selectCurrentStaffState);

  return useMemo(() => staff, [staff]);
};

export const useStaffById = (id: string) => {
  const staff = useStaff();
  return useMemo(() => staff.find(item => item._id === id), [staff, id]);
};
