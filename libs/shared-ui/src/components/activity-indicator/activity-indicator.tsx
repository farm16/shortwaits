import { Portal } from "@gorhom/portal";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";

export const ActivityIndicator = () => {
  return (
    <Portal hostName="root">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.45)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <PaperActivityIndicator color="white" />
      </View>
    </Portal>
  );
};
