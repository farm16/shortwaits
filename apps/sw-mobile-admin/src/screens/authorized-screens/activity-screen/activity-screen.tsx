import { Container, Screen, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useLayoutEffect, useState } from "react";
import { FlatListProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { AuthorizedScreenProps } from "../../../navigation";

export const ActivityScreen: FC<AuthorizedScreenProps<"activity-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();
  const [activityType, setActivityType] = useState<"business" | "staff">("business");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <Text preset="headerTitle" text={`Business Activity`} />;
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            {/* <IconButton onPress={() => setActivityType("business")} withMarginRight iconType="business" />
            <IconButton onPress={() => setActivityType("staff")} withMarginRight iconType="add-staff" /> */}
          </Container>
        );
      },
    });
  }, [navigation]);

  // data is render in array order - it does not get filtered
  type Data = {
    time?: string;
    title?: string;
    description?: any;
    lineWidth?: number;
    lineColor?: string;
    eventContainerStyle?: StyleProp<ViewStyle>;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    icon?: string | React.ReactNode;
    position?: "left" | "right";
  };
  const data: Data[] = [
    {
      time: "09:00",
      title: "Event name",
      //dotColor: "red",
      description: "Event Description",
    },
    { time: "10:45", title: "Event name", description: "Event Description" },
    { time: "12:00", title: "Event name", description: "Event Description" },
    { time: "14:00", title: "Event name", description: "Event Description" },
    { time: "16:30", title: "Event name", description: "Event Description" },
    { time: "09:00", title: "Event name", description: "Event Description" },
    { time: "10:45", title: "Event name", description: "Event Description" },
    { time: "12:00", title: "Event name", description: "Event Description" },
    { time: "14:00", title: "Event name", description: "Event Description" },
  ];

  const timeComponent = (rowData: any, sectionID: number, rowID: number) => {
    return (
      <View
        style={{
          width: 60,
          paddingVertical: 5,
          paddingHorizontal: 5,
          height: 40,
          borderRadius: 13,

          backgroundColor: sectionID % 2 === 0 ? Colors.staticLightBackground : Colors.brandSecondary1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text preset="textTiny">{rowData.time}</Text>
        <Text preset="textTiny">{"Oct, 14"}</Text>
      </View>
    );
  };
  const renderDetail = (rowData, sectionID, rowID) => {
    console.log(sectionID, rowID);
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: sectionID % 2 === 0 ? Colors.staticLightBackground : Colors.brandSecondary1,
        }}
      >
        <Text preset="cardTitle">{rowData.title}</Text>
        <Space size="tiny" />
        <Text preset="cardSubtitle">{rowData.description}</Text>
      </View>
    );
  };

  return (
    <Screen preset="fixed" unsafe>
      <Timeline
        options={
          {
            style: { paddingTop: 3 },
            showsVerticalScrollIndicator: false,
          } as FlatListProps<Data>
        }
        renderTime={timeComponent}
        renderDetail={renderDetail}
        style={styles.timeline}
        data={data}
        circleColor={Colors.brandAccent}
        lineColor={Colors.brandAccent4}
        descriptionStyle={{ color: "gray" }}
        innerCircle={"dot"}
        onEventPress={() => null}
        separator={false}
        rowContainerStyle={{
          justifyContent: "center",
        }}
        columnFormat="single-column-left"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: "white",
  },
  timeline: {
    flex: 1,
    width: "92%",
    alignSelf: "center",
    marginTop: 20,
    // paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
});
