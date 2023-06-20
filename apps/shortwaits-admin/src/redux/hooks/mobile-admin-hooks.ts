import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFloatingActionButtonVisibility,
  mobileAdminInitialState,
  selectCurrentMobileAdminState,
} from "..";
/**
 *
 * @returns returns element 0 which is `short_id: 0001`
 */
export const useMobileAdmin = () => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  return useMemo(() => {
    return mobileAdmin ? mobileAdmin : null;
  }, [mobileAdmin]);
};

export const useMobileDefaultData = () => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.defaultData : null;
  }, [mobileAdmin]);
};

export const useComponentVisibility = (
  modal: keyof typeof mobileAdminInitialState["components"],
  initialVisibleState?: boolean
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialVisibleState) {
      dispatch(changeFloatingActionButtonVisibility(initialVisibleState));
    }
  }, []);

  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.components[modal] : null;
  }, [mobileAdmin, modal]);
};
