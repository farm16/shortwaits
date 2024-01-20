import React, { ForwardedRef, forwardRef } from "react";
import Share, { ShareSingleOptions, Social } from "react-native-share";

import GBottomSheet from "@gorhom/bottom-sheet";
import { EventDtoType } from "@shortwaits/shared-utils";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheet, ButtonCard, Text } from "../../../components";
import { useTheme } from "../../../theme";

type ShareEventProps = {
  event: EventDtoType;
};
export const ShareEvent = forwardRef((props: ShareEventProps, ref: ForwardedRef<GBottomSheet | null>) => {
  const { event } = props;
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();

  const singleShare = async (customOptions: ShareSingleOptions) => {
    try {
      const { isInstalled } = await Share.isPackageInstalled("com.whatsapp.android");
      await Share.shareSingle(customOptions);
    } catch (err) {
      console.log(">>> ", err);
    }
  };

  return (
    <BottomSheet ref={ref}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
            paddingTop: 4,
            paddingBottom: 16,
          }}
        >
          <Text
            preset="headerTitle"
            style={{
              width: "100%",
              textAlign: "center",
              // backgroundColor: "red",
            }}
          >
            {"Share " + event.name}
          </Text>
        </View>
        <FlatList
          data={[
            // "Facebook",
            // "Twitter",
            // "Instagram",
            {
              friendlyName: "Whatsapp",
              iconColor: Colors.brandSecondary,
              iconName: "whatsapp",
              onPress: async () => {
                const shareOptions = {
                  title: "Share file",
                  message: "Please check this out.",
                };
                await Share.open(shareOptions);
              },
            },
            {
              friendlyName: "SMS",
              iconColor: Colors.brandSecondary,
              iconName: "message-text-outline",
              onPress: async () => {
                await singleShare({
                  title: "",
                  social: Social.Sms,
                  recipient: "9199999999",
                  message: "Example SMS",
                });
              },
            },
            {
              friendlyName: "Email",
              iconColor: Colors.brandSecondary,
              iconName: "email-outline",
              onPress: async () => {
                await singleShare({
                  message: "Share.singleShare",
                  email: "email@example.com",
                  social: Social.Email,
                });
              },
            },
          ]}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom,
          }}
          renderItem={({ item }) => {
            return <ButtonCard title={item.friendlyName} rightIconName={item.iconName} rightIconColor={item.iconColor} onPress={async () => await item.onPress()} />;
          }}
        />
      </View>
    </BottomSheet>
  );
});
