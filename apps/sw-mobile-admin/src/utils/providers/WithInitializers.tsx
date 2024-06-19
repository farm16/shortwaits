import { useGetAdminMobileQuery } from "../../services";

export const WithInitializers = ({ children }: { children: React.ReactNode }) => {
  const { isLoading: isAdminMobileLoading } = useGetAdminMobileQuery();

  console.log("getting admin mobile config >>> ", isAdminMobileLoading);
  return children;
};
