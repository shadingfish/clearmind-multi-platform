// app/(login)/_layout.tsx

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, router } from "expo-router";
import { Button } from "tamagui";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@/constants/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerPosition: "right", // Set the drawer to open from the right
          drawerStyle: {
            width: "70%", // Drawer width
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold", // Bold font
            fontSize: 19, // Font size
          },
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerLeft: () => (
            <Button
              unstyled
              onPress={() => {
                router.dismissTo("/(login)/chapter2");
              }}
              style={{ marginLeft: 20 }}
            >
              <Entypo name="home" size={24} color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              unstyled
              onPress={() => navigation.toggleDrawer()}
              style={{ marginRight: 20 }}
            >
              <MaterialIcons
                name="format-list-bulleted"
                size={24}
                color="white"
              />
            </Button>
          ),
        })}
      >
        <Drawer.Screen
          name="opening" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Opening",
            title: "Part 2 Opening",
          }}
        />

        <Drawer.Screen
          name="activity1" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Your Challenging Emotions",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                }}
              >
                Identify and Describe Your Challenging Emotions
              </Text>
            ),
            headerStyle: {
              height: 140,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="activity2" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Passengers on the Bus",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                }}
              >
                Passengers on the Bus Metaphor
              </Text>
            ),
            headerStyle: {
              height: 120,
              backgroundColor: colors.headerBackground,
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
