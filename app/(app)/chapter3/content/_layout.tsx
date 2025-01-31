// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Header } from "@react-navigation/elements";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RelativePathString, router, Stack } from "expo-router";
import { Text } from "react-native";
import { Button } from "tamagui";
import SidebarModal from "@/app/SidebarModal";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function RootLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const openModal = () => setIsSidebarVisible(true);
  const closeModal = () => setIsSidebarVisible(false);

  const route = useRoute();
  const navigation = useNavigation();

  return (
    <>
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
              router.replace("/(app)/chapter3" as RelativePathString);
            }}
            style={{ marginLeft: 20 }}
          >
            <Entypo name="home" size={24} color="white" />
          </Button>
        ),
        headerRight: () => (
          <Button
            unstyled
            onPress={openModal}
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
          title: "Part 3 Opening",
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
              Label the Passengers on the Bus
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
              Identify How it Feels Within Your Body
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
              Learn How to Meditate
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="activity3_1" // This is the name of the page and must match the url from root
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
              1. The 20 Breath Meditation
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity3_2" // This is the name of the page and must match the url from root
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
              2. Relaxing Breathing (4-7-8) Exercise
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity3_3" // This is the name of the page and must match the url from root
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
              3. Mindful Daily Tasks
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity3_4" // This is the name of the page and must match the url from root
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
              4. Leaves on a Stream
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity4" // This is the name of the page and must match the url from root
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
              Make a Belief Statement
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity5" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                alignSelf: "center",
                width: "125%",
              }}
            >
              Be Aware of Cognitive Distortions
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity6" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                alignSelf: "center",
                width: "125%",
              }}
            >
              Be Aware of Cognitive Distortions
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity7" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                alignSelf: "center",
                width: "125%",
              }}
            >
              Summary of Cognitive Distortions
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="activity8" // This is the name of the page and must match the url from root
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontWeight: "bold", // Bold font
                fontSize: 19,
                color: "#FFFFFF",
                alignSelf: "center",
                width: "125%",
              }}
            >
              Reflecting on Cognitive Distortions in Various Procrastination Types
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="summary" // This is the name of the page and must match the url from root
        options={{
          title: "Part 3 Summary",
        }}
      />
    </Stack>
    
    {isSidebarVisible && (
        <SidebarModal
          visible={isSidebarVisible}
          onClose={closeModal} // Pass the closeModal function to handle modal dismissal
          chapterName={"chapter3"}
        />
      )}
    </>
  );
}
