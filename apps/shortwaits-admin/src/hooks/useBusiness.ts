import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentBusinessState } from "@shortwaits/admin/redux/business";

export const useBusiness = () => {
  const business = useSelector(selectCurrentBusinessState);

  return useMemo(() => business, [business]);
};
