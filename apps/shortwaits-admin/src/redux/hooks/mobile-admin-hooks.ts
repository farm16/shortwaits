import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFloatingActionButtonVisibility,
  mobileAdminInitialState,
  selectCurrentMobileAdminState,
} from "..";
import { useIsFocused } from "@react-navigation/native";

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

export const useGhostComponent = (
  component: keyof (typeof mobileAdminInitialState)["components"]
) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (component === "floatingActionButton") {
        dispatch(changeFloatingActionButtonVisibility(true));
      }
    }
    return () => {
      if (component === "floatingActionButton") {
        dispatch(changeFloatingActionButtonVisibility(false));
      }
    };
  }, [component, dispatch, isFocused]);

  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.components[component] : null;
  }, [mobileAdmin, component]);
};
