import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EmojiSelector from "react-native-emoji-selector";

import {
  Calendar,
  CalendarEventsType,
  Screen,
  Text,
  Button,
} from "../../../components";
import { Colors } from "../../../theme";
import { useGetBusinessQuery } from "../../../services/shortwaits-api";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness, useUser } from "../../../redux";
import { ObjectId } from "@shortwaits/shared-types";
import { truncate } from "lodash";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = () => {
  const user = useUser();
  const business = useBusiness();

  const { isFetching, data: businessPayload } = useGetBusinessQuery(
    business ? business._id : skipToken
  );
  console.log("data payload >>>", businessPayload?.data.services);

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: Colors.white,
          },
        ]}
      >
        <Button
          preset="none"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcon
            name={"account-box"}
            size={21}
            color={Colors.brandSecondary6}
            style={{ marginRight: 5 }}
          />
          <Text
            text={truncate(user.username, { length: 16, separator: "." })}
            style={[
              styles.title,
              {
                color: Colors.brandAccent,
              },
            ]}
          />
        </Button>
        <Button
          preset="none"
          // withShadow
          style={{
            flexDirection: "row",
            borderRadius: 15,
            paddingVertical: 2,
            paddingHorizontal: 10,
            alignItems: "center",
            backgroundColor: Colors.white,
          }}
        >
          <MaterialCommunityIcon
            name={"account-box-multiple"}
            size={21}
            color={Colors.brandSecondary6}
            style={{ marginRight: 5 }}
          />
          <Text
            preset="none"
            style={[
              styles.title,
              {
                color: Colors.brandAccent,
              },
            ]}
            text="Staff"
          />
        </Button>
      </View>

      <Calendar events={SAMPLE_EVENTS} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingRight: 12,
    paddingLeft: 25,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginRight: "auto",
    fontSize: 17,
    fontWeight: "600",
  },
});
const SAMPLE_EVENTS: CalendarEventsType = [
  {
    title: "2022-08-26",
    data: [
      {
        name: "sample 1 event",
        service: {
          hours: {
            mon: [{ startTime: 540, endTime: 1020, isActive: true }],
            tue: [{ startTime: 540, endTime: 1020, isActive: true }],
            wed: [{ startTime: 540, endTime: 1020, isActive: true }],
            thu: [{ startTime: 540, endTime: 1020, isActive: true }],
            fri: [{ startTime: 540, endTime: 1020, isActive: true }],
            sat: [{ startTime: 540, endTime: 1020, isActive: true }],
            sun: [{ startTime: 540, endTime: 1020, isActive: true }],
          },
          serviceColor: {
            colorId: "3",
            colorName: "green",
            hexCode: "#C59DE7",
            isSelected: null,
            isDefault: false,
          },
          _id: "63006bebed27a195d38b807c" as unknown as ObjectId,
          businessId: "63006bebed27a195d38b807b" as unknown as ObjectId,
          name: "Service I - 15 mins",
          description: "Describe your service here =)",
          applicableCategories: [
            "1ccacea16652f70da4bfc923",
            "ff1eb8bd6cb17940ab78c0ee",
            "cea8be18f8249fdbaaa535b0",
          ] as unknown as ObjectId[],
          durationInMin: 30,
          price: 1500,
          currency: "USD",
          isPrivate: false,
          isVideoConference: false,
          deleted: false,
          imageUrl: "",
          createdBy: null,
          updatedBy: null,
        },
        description: "sample event description",
        staff: [
          {
            preferredAlias: {
              alias: "username",
              customAlias: "",
            },
            registrationState: {
              screenName: "",
              state: 0,
              isCompleted: false,
            },
            _id: "63006bebed27a195d38b807a" as unknown as ObjectId,
            businesses: ["63006bebed27a195d38b807b" as unknown as ObjectId],
            username: "lol@lol.com",
            email: "lol@lol.com",
            password:
              "$2a$10$i1bf7CrAsjHQT6NbDcO/buGRmh8uSy3w/8wfqUB.aBLSBCp2U7W..",
            desiredCurrencies: [],
            locale: {
              countryCode: "",
              isRTL: false,
              languageCode: "",
              languageTag: "",
            },
            deleted: false,
            hashedRt:
              "$2a$10$AyAquWCyD8E.Uvu.ZiV8MO4es9zGv2bI4Go1ZaVC5e8Mnhz4j3WR.",
            lastSignInAt: new Date("2022-08-27T03:42:32.263Z"),
            firstName: "",
            lastName: "",
            accountImageUrl:
              "https://pps.whatsapp.net/v/t61.24694-24/296119877_3165503927021378_3901112922217569225_n.jpg?ccb=11-4&oh=01_AVybmGEGzeJUNFl2lKb2QJYsYWF9sCwOW_mcwfyTr4_Mgw&oe=631A7FD7",
            socialAccounts: [],
            createdAt: "",
            updatedAt: "",
            rolId: "63006beb0ea12sda195d38b807a" as unknown as ObjectId,
            address: {
              address1: "",
              address2: "",
              city: "",
              state: "",
              zip: 0,
              countryCode: "",
            },
          },
        ],
        clients: [
          {
            alias: "customAlias",
            customAlias: "tadeo",
            registrationState: {
              screenName: "",
              state: 0,
              isCompleted: false,
            },
            _id: "63006bebed27a195d38b807a" as unknown as ObjectId,
            businesses: ["63006bebed27a195d38b807b" as unknown as ObjectId],
            username: "lol@lol.com",
            email: "lol@lol.com",
            password:
              "$2a$10$i1bf7CrAsjHQT6NbDcO/buGRmh8uSy3w/8wfqUB.aBLSBCp2U7W..",
            desiredCurrencies: [],
            locale: null,
            deleted: false,
            firstName: "",
            lastName: "",
            accountImageUrl:
              "https://pps.whatsapp.net/v/t61.24694-24/296119877_3165503927021378_3901112922217569225_n.jpg?ccb=11-4&oh=01_AVybmGEGzeJUNFl2lKb2QJYsYWF9sCwOW_mcwfyTr4_Mgw&oe=631A7FD7",
            address: {
              address1: "",
              address2: "",
              city: "",
              state: "",
              zip: 0,
              countryCode: "",
            },
            socialAccounts: null,
            createdAt: "",
            updatedAt: "",
            rolId: "63abebed27a195d38b807a" as unknown as ObjectId,
            hashedRt:
              "$2a$10$AyAquWCyD8E.Uvu.ZiV8MO4es9zGv2bI4Go1ZaVC5e8Mnhz4j3WR.",
            lastSignInAt: new Date("2022-08-27T03:42:32.263Z"),
          },
        ],
        createdBy: "63006bebed27a195d38b807c" as unknown as ObjectId,
        updatedBy: "63006bebed27a195d38b807c" as unknown as ObjectId,
        features: [],
        status: {
          statusCode: 0,
          statusName: "success",
        },
        priceExpected: 1000,
        priceFinal: 2000,
        deleted: false,
        canceled: false,
        cancellationReason: "",
        repeat: false,
        payment: {},
        notes: "",
        labels: [],
        durationInMin: 15,
        isGroupEvent: false,
        startTime: new Date("2022-02-26T16:37:48.244Z"),
        endTime: new Date("2022-02-26T16:37:48.244Z"),
        endTimeExpected: new Date("2022-02-26T16:37:48.244Z"),
      },
    ],
  },
];
