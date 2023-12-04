import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import { truncate } from "lodash";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../../theme";
import { handleEmail, handlePhoneCall, handleSms } from "../../utils";
import { generateAvatarUrl } from "../../utils/generateAvatarUrl";
import { ButtonProps, Card, Text } from "../common";

export type BusinessUserCardProps = ButtonProps & {
  user: BusinessUserDtoType;
};

export const BusinessUserCard = (props: BusinessUserCardProps) => {
  const { Colors } = useTheme();

  const { user } = props;

  const handlePhoneCallPress = useCallback(phoneNumber => {
    handlePhoneCall(phoneNumber);
  }, []);
  const handleSmsCallPress = useCallback(phoneNumber => {
    handleSms(phoneNumber);
  }, []);
  const handleEmailPress = useCallback(email => {
    handleEmail(email);
  }, []);

  const title = useMemo(() => {
    const fullName = user.givenName || user.familyName || user.middleName || null;
    return fullName || user.username || user.email;
  }, [user.email, user.familyName, user.givenName, user.middleName, user.username]);

  const avatarUrl = useMemo(() => {
    return generateAvatarUrl(title);
  }, [title]);

  return (
    <Card
      mode="static"
      style={{
        paddingRight: -16,
      }}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.title}
          onPress={() => {
            alert("pressed");
          }}
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
        </Pressable>
        {user.email && (
          <TouchableOpacity style={styles.icons} onPress={() => handleEmailPress(user.email)}>
            <Icon name="email-outline" color={Colors.darkGray} size={23} />
          </TouchableOpacity>
        )}
        {user.phoneNumbers && user.phoneNumbers.length > 0 && (
          <>
            <TouchableOpacity style={styles.icons} onPress={() => handlePhoneCallPress(user.phoneNumbers[0].number)}>
              <Icon name="phone" color={Colors.darkGray} size={23} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={() => handleSmsCallPress(user.phoneNumbers[0].number)}>
              <Icon name="message-text-outline" color={Colors.darkGray} size={23} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Card>
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
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderLeftColor: "#eee",
    borderLeftWidth: 1,
  },
});
