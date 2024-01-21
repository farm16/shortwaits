import Clipboard from "@react-native-clipboard/clipboard";
import React, { useCallback, useRef } from "react";
import { Alert, Linking, Platform, Pressable, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomUrl from "../../assets/icons/custom-url.svg";
import Discord from "../../assets/icons/discord-url.svg";
import FacebookLive from "../../assets/icons/fb-url.svg";
import GoogleMeet from "../../assets/icons/meet-url.svg";
import Skype from "../../assets/icons/skype-url.svg";
import Teams from "../../assets/icons/teams-url.svg";
import Twitter from "../../assets/icons/twitter-url.svg";
import Zoom from "../../assets/icons/zoom-url.svg";
import { Text } from "../common";

const urlIcons = {
  custom: {
    component: CustomUrl,
    friendlyName: "URL",
    style: {
      backgroundColor: "#424549",
      iconSize: 30,
      linkIconColor: "#ffffff",
    },
  },
  zoom: {
    component: Zoom,
    friendlyName: "Zoom",
    style: {
      backgroundColor: "#2d8cff",
      iconSize: 70,
      linkIconColor: "#ffffff",
    },
  },
  microsoft_teams: {
    component: Teams,
    friendlyName: "Microsoft Teams",
    style: {
      backgroundColor: "#ffffff",
      iconSize: 30,
      linkIconColor: "#464EB8",
    },
  },
  google_meet: {
    component: GoogleMeet,
    friendlyName: "Google Meet",
    style: {
      backgroundColor: "#ffffff",
      iconSize: 30,
      linkIconColor: "#282b30",
    },
  },
  skype: {
    component: Skype,
    friendlyName: "Skype",
    style: {
      backgroundColor: "#ffffff",
      iconSize: 30,
      linkIconColor: "#1DA1F2",
    },
  },
  facebook_live: {
    component: FacebookLive,
    friendlyName: "Facebook Live",
    style: {
      backgroundColor: "#ffffff",
      iconSize: 70,
      linkIconColor: "#4267B2",
    },
  },
  discord: {
    component: Discord,
    friendlyName: "Discord",
    style: {
      backgroundColor: "#5865F2",
      iconSize: 35,
      linkIconColor: "#ffffff",
    },
  },
  twitter_space: {
    component: Twitter,
    friendlyName: "Twitter Space",
    style: {
      backgroundColor: "#ffffff",
      iconSize: 30,
      linkIconColor: "#1DA1F2",
    },
  },
} as const;

export type UrlTypes = keyof typeof urlIcons;

type UrlCardProps = {
  type: UrlTypes;
  url: string;
};

export function UrlCard({ type, url }: UrlCardProps) {
  const cardProps = useRef(urlIcons[type]);

  const Icon = cardProps.current.component;
  const iconSize = cardProps.current.style.iconSize;

  const handleOnPress = useCallback(() => {
    const openURL = (_url: string) => Linking.openURL(_url);
    const copyToClipboard = (_url: string) => {
      Clipboard.setString(_url);
    };
    Alert.alert(
      cardProps.current.friendlyName,
      `${url}`,
      [
        { text: "Go to link", onPress: () => openURL(url), style: "default" },
        {
          text: "Copy URL",
          onPress: () => copyToClipboard(url),
          style: "default",
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  }, [url]);

  return (
    <Pressable onPress={handleOnPress} style={[styles.root, { backgroundColor: cardProps.current.style.backgroundColor }]}>
      {type === "custom" ? <Text style={{ color: "white" }} text={cardProps.current.friendlyName} /> : <Icon height={iconSize} width={iconSize} />}
      <MaterialIcon name="link-variant" size={27} color={cardProps.current.style.linkIconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
