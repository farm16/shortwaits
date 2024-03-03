import { NonIdealState, Screen, SearchBar, Space, Text } from "@shortwaits/shared-ui";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { AuthorizedScreenProps } from "../../../navigation";

export function MyFavorites({ navigation, route }: AuthorizedScreenProps<"favorites-screen">) {
  return (
    <Screen withHorizontalPadding>
      <Space size="large" />
      <Text preset="title" text="Favorites" />
      <Space size="large" />
      <SearchBar placeholder="Search" value={""} />
      <FlatList data={[]} renderItem={() => null} ListEmptyComponent={<NonIdealState type="noFavorites" />} />
    </Screen>
  );
}

const mockData = [
  {
    id: "1",
    name: "Store 1",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one that started it all",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-a-new-hope-1.jpg",
  },
  {
    id: "2",
    name: "store 2",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The best one",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-empire-strikes-back-1.jpg",
  },
  {
    id: "3",
    name: "store 3",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with the Ewoks",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-return-of-the-jedi-1.jpg",
  },
  {
    id: "4",
    name: "store 4",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with Jar Jar",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-phantom-menace-1.jpg",
  },
];
