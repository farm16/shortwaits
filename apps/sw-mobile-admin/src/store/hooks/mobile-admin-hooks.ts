import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFloatingActionButtonVisibility, mobileAdminInitialState, selectCurrentMobileAdminState } from "..";
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

export const useGhostComponent = (component: keyof (typeof mobileAdminInitialState)["components"]) => {
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

export const useShowGhostComponent = (componentName = "floatingActionButton") => {
  const dispatch = useDispatch();
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  const isFocused = useIsFocused();

  // console.log();
  // console.log("--- useShowGhostComponent ---");
  // console.log("component name: ", componentName);
  // console.log("isFocused: ", isFocused);
  // console.log(`${componentName} visibility: `, mobileAdmin.components[componentName].isVisible);
  // console.log("-----------------------------");
  // console.log();

  useEffect(() => {
    const componentActions = {
      floatingActionButton: changeFloatingActionButtonVisibility,
    };

    if (isFocused && mobileAdmin.components[componentName].isVisible === false) {
      dispatch(componentActions[componentName](true));
    }
    if (!isFocused && mobileAdmin.components[componentName].isVisible === true) {
      dispatch(componentActions[componentName](false));
    }
  }, [isFocused]);

  useEffect(() => {
    const componentActions = {
      floatingActionButton: changeFloatingActionButtonVisibility,
    };

    if (mobileAdmin.components[componentName].isVisible === true) {
      dispatch(componentActions[componentName](true));
    }
    return () => {
      console.log("unmounted");
      dispatch(componentActions[componentName](false));
    };
  }, []);
};

export const usePreferredLanguageFromStore = () => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.preferredLanguage : null;
  }, [mobileAdmin]);
};

export const useSuggestedLanguageFromStore = () => {
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  return useMemo(() => {
    return mobileAdmin ? mobileAdmin.suggestedLanguage : null;
  }, [mobileAdmin]);
};
