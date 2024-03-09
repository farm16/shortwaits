import { useNavigation } from "@react-navigation/native";
import { EventDtoType } from "@shortwaits/shared-lib";
import { IconButton, Space, Text, TimeRange, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import React, { FC } from "react";
import { ImageBackground, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthorizedScreenProps } from "../../../navigation";
import { useDeviceInfo } from "../../../store";

const locales = { en: enUS, es };

export const TopTile = ({ title, subTitle, onPress, imageUrl }) => {
  const { Colors } = useTheme();
  return (
    <TouchableOpacity style={styles.tileContainer} onPress={onPress}>
      <ImageBackground
        style={[styles.tile]}
        imageStyle={styles.imageTile}
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
      >
        <View style={styles.opacityBackground}>
          <Text preset="none" style={[styles.tileSubTitle, { color: Colors.white }]} text={title} />
          <Text preset="none" style={[styles.tileTitle, { color: Colors.white }]} text={subTitle} />
          <View style={styles.squareIcon}>
            <IconButton iconType="arrow-top-right" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

type HomeScreenTitleProps = {
  title: string;
  subTitle?: string;
  renderLeftComponent?: () => React.ReactNode;
};
export const HomeScreenTitle: FC<HomeScreenTitleProps> = ({ title, renderLeftComponent: RenderLeftComponent, subTitle }) => {
  const { Colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View>
        {subTitle && (
          <Text
            preset="none"
            style={{
              color: Colors.black,
              fontSize: getResponsiveFontSize(14),
              fontWeight: "400",
            }}
            text={subTitle}
          />
        )}
        <Text
          preset="none"
          style={{
            color: Colors.black,
            fontSize: getResponsiveFontSize(18),
            fontWeight: "700",
          }}
          text={title}
        />
      </View>
      {RenderLeftComponent && <RenderLeftComponent />}
    </View>
  );
};

export const EventItem = (props: ListRenderItemInfo<EventDtoType>) => {
  const { Colors } = useTheme();
  const { language, preferredLanguage } = useDeviceInfo();
  const { navigate } = useNavigation<AuthorizedScreenProps<"home-screen">["navigation"]>();
  const languageCode = language ?? preferredLanguage ?? "en";
  const locale = locales[languageCode] ?? enUS;

  const date = new Date(props.item.startTime);
  const month = format(date, "MMM", { locale }).toUpperCase();
  const day = format(date, "d");
  const weekday = format(date, "EEE", { locale }).toUpperCase();

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("authorized-stack", {
          screen: "event-details-screen",
        });
      }}
      style={{
        flexDirection: "row",
        backgroundColor: Colors.lightBackground,
        // justifyContent: "space-between",
        alignItems: "center",
        padding: getResponsiveHeight(16),
        borderTopStartRadius: 6,
        borderTopEndRadius: 6,
        borderBottomStartRadius: 6,
        borderBottomEndRadius: 6,
      }}
    >
      <View
        style={{
          padding: getResponsiveHeight(3),
          backgroundColor: Colors.white,
          width: getResponsiveHeight(70),
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 4,
            backgroundColor: Colors.lightBackground,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            preset="none"
            style={{
              fontSize: getResponsiveFontSize(10),
              color: Colors.black,
              fontWeight: "400",
            }}
            text={month}
          />
        </View>
        <Text
          preset="none"
          style={{
            fontSize: getResponsiveFontSize(14),
            color: Colors.black,
            fontWeight: "700",
          }}
          text={day}
        />
        <Text
          preset="none"
          style={{
            fontSize: getResponsiveFontSize(10),
            color: Colors.black,
            fontWeight: "400",
          }}
          text={weekday}
        />
      </View>
      <View
        style={{
          paddingHorizontal: getResponsiveHeight(16),
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            text={props.item.name}
            style={{
              fontSize: getResponsiveFontSize(14),
              fontWeight: "700",
              color: Colors.black,
              marginRight: getResponsiveHeight(16),
            }}
          />
        </View>
        <Space size="tiny" />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon name="clock-outline" color={Colors.black} size={getResponsiveHeight(20)} />
          <TimeRange
            style={{
              fontSize: getResponsiveFontSize(12),
              fontWeight: "400",
              color: Colors.black,
              marginRight: getResponsiveHeight(16),
              paddingLeft: getResponsiveHeight(4),
            }}
            startTime={props.item.startTime}
            endTime={props.item.endTime}
            locale={languageCode as "en" | "es"}
          />
        </View>
        <Space size="tiny" />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon name="map-marker-radius-outline" color={Colors.black} size={getResponsiveHeight(20)} />
          <Text
            text={props.item.location.city + ", " + props.item.location.state}
            style={{
              fontSize: getResponsiveFontSize(12),
              fontWeight: "400",
              color: Colors.black,
              marginRight: getResponsiveHeight(16),
              paddingLeft: getResponsiveHeight(4),
            }}
          />
        </View>
      </View>
      <IconButton
        iconType="three-dots"
        iconColor="disabledText"
        style={{
          position: "absolute",
          right: 16,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: getResponsiveFontSize(21),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bottomContainer: {
    flex: 1,
    paddingTop: getResponsiveHeight(41),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  eventContainer: {
    flex: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  greetingText: {
    fontSize: getResponsiveHeight(21),
    fontWeight: "700",
  },
  squareContainer: {
    flexDirection: "row",
  },
  tileContainer: {
    flex: 1,
    height: getResponsiveHeight(100),
  },
  tile: {
    flex: 1,
  },
  imageTile: {
    borderRadius: 15,
  },
  opacityBackground: {
    flex: 1,
    borderRadius: 15,
    padding: getResponsiveHeight(16),
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  tileTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
  },
  tileSubTitle: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: "500",
  },
  squareIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: getResponsiveHeight(30) / 2,
    height: getResponsiveHeight(30),
    width: getResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "center",
  },
});
