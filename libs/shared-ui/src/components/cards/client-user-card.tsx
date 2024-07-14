import { CombinedClientType } from "@shortwaits/shared-lib";
import { truncate } from "lodash";
import { useMemo } from "react";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme";
import { generateAvatarUrl } from "../../utils/generateAvatarUrl";
import { Button, ButtonProps, Text } from "../common";

export type ClientUserCardProps = ButtonProps & {
  user: CombinedClientType;
  onPress?: () => void;
  onLongPress?: () => void;
  onUserRemove?: () => void;
  clientRemoveMessage?: string;
};
const defaultClientRemoveMessage = "Are you sure you want to remove this client from event?";

export const ClientUserCard = (props: ClientUserCardProps) => {
  const { Colors } = useTheme();
  const { user, clientRemoveMessage = defaultClientRemoveMessage, onPress, onLongPress, onUserRemove } = props;

  const title = useMemo(() => {
    const title = user.givenName || user.familyName || user.middleName || user.displayName || truncate(user.username || user.email, { length: 20 });
    return title || "";
  }, [user.displayName, user.email, user.familyName, user.givenName, user.middleName, user.username]);

  const clientType = user.clientType || "local";
  const isSwClient = clientType === "external";

  console.log(JSON.stringify(user, null, 2));

  const avatarUrl = useMemo(() => {
    return generateAvatarUrl(title);
  }, [title]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress();
    }
  };

  const handleRemove = () => {
    Alert.alert("Remove Client", clientRemoveMessage, [
      {
        text: "Cancel",
        onPress: () => {
          // Do nothing
        },
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => {
          if (onUserRemove) {
            onUserRemove();
          }
        },
        style: "destructive",
      },
    ]);
  };

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<any>, _dragX: Animated.AnimatedInterpolation<any>) => {
    return (
      <Pressable
        onPress={() => {
          handleRemove();
        }}
        style={[{ backgroundColor: Colors.failedBackground }, styles.rightAction]}
      >
        <Icon name="minus-circle-outline" color={Colors.failed} size={32} />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Button
        preset="card"
        style={{ backgroundColor: Colors.lightBackground, zIndex: 10 }}
        onLongPress={() => {
          handleLongPress();
        }}
        onPress={() => {
          handlePress();
        }}
      >
        {isSwClient ? (
          <View
            style={{
              position: "absolute",
              left: -85,
              top: 8,
              width: 200,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate: "310deg" }],
              backgroundColor: Colors.brandPrimary,
              paddingVertical: 2,
              zIndex: 1,
              elevation: 1,
              shadowColor: Colors.darkGray,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
              }}
              preset="none"
              text="SW"
            />
          </View>
        ) : null}
        <FastImage
          source={{
            uri: user.accountImageUrl || avatarUrl,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
        <Text
          preset="cardTitle"
          text={truncate(title, {
            length: 20,
          })}
        />
        <View style={styles.icons}>
          <Icon name="dots-vertical" color={Colors.darkGray} size={23} />
        </View>
      </Button>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icons: {
    flex: 1,
    alignItems: "flex-end",
    paddingLeft: 16,
  },
});
