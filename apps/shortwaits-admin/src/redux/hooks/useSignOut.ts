import { resetAuth, resetBusiness, resetUser } from "../slices";
import { useAppDispatch } from "./useDispatch";

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(resetAuth());
    dispatch(resetBusiness());
    dispatch(resetUser());
  };
};
