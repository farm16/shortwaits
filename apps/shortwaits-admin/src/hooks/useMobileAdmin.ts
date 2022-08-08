import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentMobileAdminState } from "@shortwaits/admin/redux/mobile-admin";
/**
 *
 * @returns returns element 0 which is `short_id: 0001`
 */
export const useMobileAdmin = () => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  return useMemo(() => {
    return mobileAdmin ? mobileAdmin[0] : null;
  }, [mobileAdmin]);
};
