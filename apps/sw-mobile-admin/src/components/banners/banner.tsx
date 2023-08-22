import React from "react";
import { useMobileAdmin } from "../../store";
import { PremiumMembershipBanner } from "./premium-membership-banner";

const banners = {
  "premium-membership": PremiumMembershipBanner,
};

export function Banner() {
  const { components } = useMobileAdmin();
  const BannerComponent = banners[components?.banner?.name as string] || null;
  return BannerComponent ? <BannerComponent /> : null;
}
