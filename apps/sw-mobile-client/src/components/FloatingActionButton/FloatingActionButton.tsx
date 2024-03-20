import { useNavigation } from "@react-navigation/native";
import { FabButton as SwFloatingActionButton } from "@shortwaits/shared-ui";
import React, { useCallback } from "react";
import { AuthorizedScreenProps } from "../../navigation";

export function FloatingActionButton() {
  const { navigate } = useNavigation<AuthorizedScreenProps<"home-screen">["navigation"]>();

  const handleAddClient = useCallback(() => {
    navigate("modals", {
      screen: "qr-scanner-modal-screen",
    });
  }, [navigate]);

  return <SwFloatingActionButton isAnimated onPress={handleAddClient} backgroundColor="brandAccent" iconColor="black" icon="qrcode-scan" />;
}
