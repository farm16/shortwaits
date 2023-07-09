import React from "react";
import { useMobileAdmin } from "../../redux";
import { PremiumMembershipBanner } from "./premium-membership-banner";

const banners = {
  "premium-membership": PremiumMembershipBanner,
};

export function Banner() {
  const { components } = useMobileAdmin();
  const BannerComponent = banners[components?.banner?.name] || null;
  return BannerComponent ? <BannerComponent /> : null;
}
