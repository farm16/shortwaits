import { useFocusEffect } from "@react-navigation/native";
import { FabGroupButton } from "@shortwaits/shared-ui";
import React, { useCallback, useState } from "react";
import { useActions } from "./useActions";

export function FloatingGroupActionButton() {
  const actions = useActions();
  const [isVisible, setIsVisible] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);
      return () => setIsVisible(false);
    }, [])
  );

  return <FabGroupButton actions={actions} isVisible={isVisible} />;
}
