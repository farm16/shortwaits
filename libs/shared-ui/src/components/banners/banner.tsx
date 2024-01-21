import React from "react";
import { PremiumMembershipBanner } from "./premium-membership-banner";

const banners = {
  "premium-membership": PremiumMembershipBanner,
};

type BannerProps = {
  banner: keyof typeof banners;
  onPress?: () => void;
  onDismiss?: () => void;
};

export function Banner(props: BannerProps) {
  const { onDismiss, onPress, banner } = props;

  if (!banner) {
    return null;
  }

  const BannerComponent = banners[props.banner];
  return <BannerComponent onDismiss={onDismiss} onPress={onPress} />;
}
