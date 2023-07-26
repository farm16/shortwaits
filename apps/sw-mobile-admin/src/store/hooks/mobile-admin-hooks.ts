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
    } else dispatch(changeFloatingActionButtonVisibility(false));

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

export const useHideGhostComponent = (
  componentName = "floatingActionButton"
) => {
  const dispatch = useDispatch();
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  useEffect(() => {
    const actions = {
      floatingActionButton: changeFloatingActionButtonVisibility,
    };

    if (mobileAdmin.components[componentName].isVisible === false) {
      return dispatch(
        actions[componentName](mobileAdmin.components[componentName].isVisible)
      );
    } else {
      dispatch(actions[componentName](false));
    }

    return () => {
      dispatch(changeFloatingActionButtonVisibility(false));
    };
  }, []);
};

export const useShowGhostComponent = (
  componentName = "floatingActionButton"
) => {
  const dispatch = useDispatch();
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  useEffect(() => {
    const actions = {
      floatingActionButton: changeFloatingActionButtonVisibility,
    };

    if (mobileAdmin.components[componentName].isVisible === false) {
      return dispatch(
        actions[componentName](mobileAdmin.components[componentName].isVisible)
      );
    } else {
      dispatch(actions[componentName](false));
    }

    return () => {
      dispatch(changeFloatingActionButtonVisibility(false));
    };
  }, []);
};
