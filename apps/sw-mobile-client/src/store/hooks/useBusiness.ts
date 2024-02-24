import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentBusinessState } from "..";

export const useBusiness = () => {
  const business = useSelector(selectCurrentBusinessState);

  return useMemo(() => business, [business]);
};
