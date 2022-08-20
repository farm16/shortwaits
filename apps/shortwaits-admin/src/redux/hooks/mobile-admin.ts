import { useMemo } from "react";
import { useSelector } from "react-redux";
import { mobileAdminInitialState, selectCurrentMobileAdminState } from "..";
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

export const useMobileAdminModal = (
  modal: keyof typeof mobileAdminInitialState["modals"]
) => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.modals[modal] : null;
  }, [mobileAdmin, modal]);
};
