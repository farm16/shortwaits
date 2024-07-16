import { useEffect, useState } from "react";
import { useLazyGetAdminMobileQuery } from "../../services";
import { useMobileAdmin } from "../../store";
// todo check network status
export const WithInitializers = ({ children }: { children: React.ReactNode }) => {
  const adminMobile = useMobileAdmin();
  const [getAdminMobile, getAdminMobileStatus] = useLazyGetAdminMobileQuery();
  const [attempt, setAttempt] = useState(0);

  if (getAdminMobileStatus.isLoading) {
    console.log("loading admin mobile data");
  }
  if (getAdminMobileStatus.isError) {
    console.error("error fetching admin mobile", JSON.stringify(getAdminMobileStatus?.error));
  }
  if (getAdminMobileStatus.isSuccess) {
    console.log("admin mobile fetched", JSON.stringify(getAdminMobileStatus?.data));
  }

  useEffect(() => {
    const maxAttempts = 15;
    const interval = 3000;

    const intervalId = setInterval(() => {
      if (!adminMobile?.shortwaits && attempt < maxAttempts) {
        console.log("attempting to fetch admin mobile config");
        console.log("attempt >>> ", attempt);
        setAttempt(prev => prev + 1);
        getAdminMobile();
      } else {
        console.log("clearing interval");
        clearInterval(intervalId);
      }
    }, interval);
    return () => clearInterval(intervalId);
  }, [adminMobile?.shortwaits, attempt, getAdminMobile]);

  return children;
};
