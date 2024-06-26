import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import { truncate } from "lodash";
import { useCallback, useMemo } from "react";
import { Animated, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme";
import { handleEmail, handlePhoneCall, handleSms } from "../../utils";
import { generateAvatarUrl } from "../../utils/generateAvatarUrl";
import { Button, Text } from "../common";

export type BusinessUserCardProps = {
  user: BusinessUserDtoType;
  style?: StyleProp<ViewStyle>;
  onPress(): void;
};

export const BusinessUserCard = (props: BusinessUserCardProps) => {
  const { Colors } = useTheme();

  const { user, onPress, style: styleOverrides } = props;

  const handlePhoneCallPress = useCallback(phoneNumber => {
    handlePhoneCall(phoneNumber);
  }, []);
  const handleSmsCallPress = useCallback(phoneNumber => {
    handleSms(phoneNumber);
  }, []);
  const handleEmailPress = useCallback(email => {
    handleEmail(email);
  }, []);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const title = useMemo(() => {
    const fullName = user.givenName || user.familyName || user.middleName || null;
    return fullName || user.username || user.email;
  }, [user.email, user.familyName, user.givenName, user.middleName, user.username]);

  const avatarUrl = useMemo(() => {
    return generateAvatarUrl(title);
  }, [title]);

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<any>, dragX: Animated.AnimatedInterpolation<any>) => {
    return (
      <Pressable
        onPress={() => {
          alert("pressed");
        }}
        style={{
          backgroundColor: Colors.failedBackground,
          justifyContent: "center",
          alignItems: "center",
          width: 75,
          marginBottom: 10,
        }}
      >
        <Icon name="minus-circle-outline" color={Colors.failed} size={32} />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Button
        preset="card"
        isTouchableOpacity={false}
        style={[
          {
            backgroundColor: Colors.lightBackground,
            zIndex: 10,
          },
          styleOverrides,
        ]}
        onPress={handlePress}
      >
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
