import React, { FC, useLayoutEffect, useRef } from "react";
import { truncate } from "lodash";
import Share, { ShareSingleOptions, Social } from "react-native-share";

import {
  Screen,
  Text,
  Container,
  IconButton,
  BackButton,
  useBottomSheet,
  BottomSheetType,
  BottomSheet,
  ButtonCard,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { EventScreenTabs } from "./event-tabs";
import { useHideGhostComponent } from "../../../store";
import { Alert, FlatList, View } from "react-native";
import { useTheme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: test this with real device ios and android
// TODO: add config for android (missing)
export const EventScreen: FC<AuthorizedScreenProps<"event-screen">> = ({
  navigation,
  route,
}) => {
  const { event } = route.params;

  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  useHideGhostComponent();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              text={truncate(event.name, { length: 16 })}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              onPress={() => handleBottomSheet.expand()}
              withMarginRight
              iconType="share"
            />
            <IconButton
              onPress={() => {
                navigation.navigate("modals", {
                  screen: "form-modal-screen",
                  params: {
                    form: "updateEvent",
                    initialValues: event,
                  },
                });
              }}
              withMarginRight
              iconType="edit"
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [event, handleBottomSheet, navigation]);

  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();

  const checkIfPackageIsInstalled = async packageSearch => {
    const { isInstalled } = await Share.isPackageInstalled(packageSearch);

    Alert.alert(
      `Package: ${packageSearch}`,
      `${isInstalled ? "Installed" : "Not Installed"}`
    );
  };

  const singleShare = async (customOptions: ShareSingleOptions) => {
    try {
      const { isInstalled } = await Share.isPackageInstalled(
        "com.whatsapp.android"
      );

      // if (isInstalled) {
      await Share.shareSingle(customOptions);
      // } else {
      //   Alert.alert(
      //     "Whatsapp not installed",
      //     "Whatsapp not installed, please install.",
      //     [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      //   );
      // }
    } catch (err) {
      console.log(">>> ", err);
    }
  };
  const url = "https://awesome.contents.com/";
  const title = "Awesome Contents";
  const message = "Please check this out.";
  const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";

  // const options = Platform.select<ShareOptions>({
  //   ios: {
  //     activityItemSources: [
  //       {
  //         // For sharing url with custom title.
  //         placeholderItem: { type: "url", content: url },
  //         item: {
  //           default: { type: "url", content: url },
  //         },
  //         subject: {
  //           default: title,
  //         },
  //         linkMetadata: { originalUrl: url, url, title },
  //       },
  //       {
  //         // For sharing text.
  //         placeholderItem: { type: "text", content: message },
  //         item: {
  //           default: { type: "text", content: message },
  //           message: null, // Specify no text to share via Messages app.
  //         },
  //         linkMetadata: {
  //           // For showing app icon on share preview.
  //           title: message,
  //         },
  //       },
  //     ],
  //   },
  //   default: {
  //     title,
  //     subject: title,
  //     message: `${message} ${url}`,
  //   },
  // });

  return (
    <Screen
      preset="fixed"
      unsafe
      unsafeBottom
      backgroundColor="backgroundOverlay"
    >
      <EventScreenTabs event={event} />
      <BottomSheet ref={bottomSheetRef}>
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
              Share Event
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
              return (
                <ButtonCard
                  title={item.friendlyName}
                  rightIconName={item.iconName}
                  rightIconColor={item.iconColor}
                  onPress={async () => await item.onPress()}
                />
              );
            }}
          />
        </View>
      </BottomSheet>
    </Screen>
  );
};
