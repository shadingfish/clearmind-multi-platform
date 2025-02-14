// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Header } from "@react-navigation/elements";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { Text } from "react-native";
import { Button } from "tamagui";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={() => ({
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold", // Bold font
          fontSize: 19, // Font size
        },
        headerLeft: () => (
          <Button
            unstyled
            onPress={() => {
              router.replace("/(app)/chapter1");
            }}
            style={{ marginLeft: 20 }}
          >
            <Entypo name="home" size={24} color="white" />
          </Button>
        ),
        headerRight: () => (
          <Button
            unstyled
            onPress={() => console.log("toggle drawer")}
            style={{ marginRight: 20 }}
          >
            <MaterialIcons
              name="format-list-bulleted"
              size={24}
              color="white"
            />
          </Button>
        ),
        header: ({ options, route }) => (
          //@ts-ignore
          <Header
            {...options}
            headerStyle={{
              height: ["opening", "summary"].includes(route.name) ? 100 : 120,
              backgroundColor: colors.headerBackground,
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="opening" // This is the name of the page and must match the url from root
        options={{
          title: "Part 1 Opening",
        }}
      />

      <Stack.Screen
        name="activity0" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                width: "120%",
                alignSelf: "center",
              }}
            >
              Prioritize Your Life Values
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity1" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                width: "120%",
                alignSelf: "center",
              }}
            >
              Identify and Describe Your Challenging Emotions
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity2_1" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                width: "120%",
                alignSelf: "center",
              }}
            >
              Discover Various Types of Procrastination Tendencies
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="activity2_2" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                width: "120%",
                alignSelf: "center",
              }}
            >
              Procrastination Tendencies Questions
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="activity2" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",

                alignSelf: "center",
              }}
            >
              Passengers on the Bus Metaphor
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity3" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                alignSelf: "center",
              }}
            >
              How to Use the App
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="summary" // This is the name of the page and must match the url from root
        options={{
          title: "Part 1 Summary",
        }}
      />
    </Stack>
  );
}
