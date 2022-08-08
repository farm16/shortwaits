import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentOnboardingState } from "@shortwaits/admin/redux/onboarding";

export const useOnboarding = () => {
  const onboarding = useSelector(selectCurrentOnboardingState);

  return useMemo(() => onboarding, [onboarding]);
};
