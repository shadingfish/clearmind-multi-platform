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
              router.push("/(app)/chapter4" as RelativePathString);
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
              height: ["opening", "activity5"].includes(route.name) ? 100 : 120,
              backgroundColor: colors.headerBackground,
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="opening" // This is the name of the page and must match the url from root
        options={{
          title: "Part 4 Opening",
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
                  alignSelf: "center",
                  width: "125%",
                }}
              >
                Introduce a New Framework
              </Text>
            ),
        }}
      />
      <Stack.Screen
        name="activity2" // This is the name of the page and must match the url from root
        options={{
          title: "Commit to a New Goal",
        }}
      />


    </Stack>
    
    {isSidebarVisible && (
        <SidebarModal
          visible={isSidebarVisible}
          onClose={closeModal} // Pass the closeModal function to handle modal dismissal
          chapterName={"chapter4"}
        />
      )}
    </>
  );
}
